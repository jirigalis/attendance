<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Event;

use App\Domain\Event\Event;
use App\Domain\Member\Member;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use App\Domain\Event\EventRepository;
use App\Domain\Schoolyear\Schoolyear;
use Respect\Validation\Validator as V;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPMailer\PHPMailer\PHPMailer;
use Exception;

class InMemoryEventRepository implements EventRepository
{
    private $events;

    public function __construct(array $events = null) {
        $this->events = Event::all();
    }

    public function findAll() : object {
        return $this->events;
    }

    public function getOpenEvents() {
        $events = Event::where('openRegistration', '=', 1)->get();
        return $events;
    }

    public function openRegistration(int $id) {
        $event = $this->getById($id);
        $event->openRegistration = 1;
        $event->save();
    }

    public function closeRegistration(int $id) {
        $event = $this->getById($id);
        $event->openRegistration = 0;
        $event->save();
    }

    public function getById(int $id) {
        $event = Event::find($id);

        if ($event == null) {
            throw new DomainRecordNotFoundException();
        }

        foreach ($event->members as $m) {
            // $event->members2[] = $m;
        }

        return $event;
    }

    public function create(object $data): int
    {
        $valid = V::alnumCZ('.-')->validate($data->name);

        if ($valid) {
            $event = new Event();
            $event->name = htmlspecialchars($data->name);
            $event->startDate = date('Y-m-d', strtotime($data->startDate));
            $event->endDate = date('Y-m-d', strtotime($data->endDate));
            $event->description = htmlspecialchars($data->description);

            $event->save();
            return $event->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, object $data): int
    {
        $event = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($event->name != $data->name) {
            if (!V::alnumCZ()->validate($data->name)) {
                throw new CannotCreateDomainRecordException();
            }

            $event->name = htmlspecialchars($data->name);
            $update = true;
        }

        if ($event->startDate != $data->startDate) {
            $event->startDate = date('Y-m-d', strtotime($data->startDate));
            $update = true;
        }

        if ($event->endDate != $data->endDate) {
            $event->endDate = date('Y-m-d', strtotime($data->endDate));
            $update = true;
        }

        if ($event->description != $data->description) {
            $event->description = htmlspecialchars($data->description);
            $update = true;
        }

        if ($update) {
            $event->save();
            return 1;
        }

        return 0;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        $res =  Event::destroy($id);
        return $res;
    }

    public function getForAllMembers() {
        return Member::has('event')->with('event')->get();
    }

    public function addMembers(int $eventId, array $members) {
        if (!V::intVal()->validate($eventId)) {
            throw new InputNotValidException('Wrong Event ID');
        }

        $event = Event::find($eventId);
        foreach ($members as $memberId) {
            $member = Member::find($memberId);
            $event->members()->save($member);
        }

        return true;
    }

    public function removeMember(int $eventId, int $memberId) {
        if (!V::intVal()->validate($eventId)) {
            throw new InputNotValidException('Wrong Event ID');
        }

        $event = Event::find($eventId);
        $event->members()->detach($memberId);
    }

    public function getByMemberAndSchoolyear(int $memberId, int $schoolyearId)
    {
        if (!V::intVal()->validate($memberId) || !V::intVal()->validate($schoolyearId)) {
            throw new InputNotValidException();
        }

        $schoolyear = Schoolyear::find($schoolyearId);

        $events = Event::whereHas('members', function($q) use ($memberId) {
            $q->where('member_id', $memberId);
        })->where('startDate', '>=', $schoolyear->startDate)->where('endDate', '<=', $schoolyear->endDate)->get();

        return $events;
    }

    public function markParticipation(int $eventId, int $memberId, bool $participated) {
        if (!V::intVal()->validate($memberId) || !V::intVal()->validate($memberId)) {
            throw new InputNotValidException();
        }

        $event = Event::find($eventId);

        $event->members()->updateExistingPivot($memberId, ['participated' => $participated]);

        return $event;
    }

    public function sendRegistrationCode(string $email) {
        if (!V::email()->validate($email)) {
            throw new InputNotValidException();
        }

        // find members by email of parent
        $members = Member::where('email', $email)->get();

        if (count($members) == 0) {
            $openEvents = Event::where('openRegistration', 1)->get();

            return (object)[
                'success' => true,
                'message' => 'No members found for this email.',
            ];
        }

        $payload = [
            'email' => $email,
            'timestamp' => time() + 3600, // valid for 1 hour
        ];

        $jwtSecret = getenv('JWT_SECRET');
        $token = JWT::encode($payload, $jwtSecret);

        $loginUrl = getenv('REGISTRATION_APP_URL') . '/prihlaska?token=' . $token;

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = getenv('SMTP_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('SMTP_USER');
            $mail->Password   = getenv('SMTP_PWD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('zalesakzdanice@seznam.cz', 'Zálesák Ždánice');
            $mail->addAddress($email);
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            $mail->isHTML(true);
            $mail->Subject = 'Přihlášení k přihlášce na akci';

            $template = file_get_contents(__DIR__ . '/confirm_email_template.html');
            $htmlBody = str_replace('{{LOGIN_URL}}', $loginUrl, $template);

            $mail->Body = $htmlBody;

            $mail->send();
        } catch (MailException $e) {
            throw new WrongParameterException('email');
        }

        return (object)[
            'success' => true,
            'message' => 'Registration code sent to ' . $email
        ];
    }

    public function verifyToken(string $token) {
        $jwtSecret = getenv('JWT_SECRET');

        try {
            $decoded = JWT::decode($token, new Key($jwtSecret, 'HS256'));
            $email = $decoded->email ?? null;
            $timestamp = $decoded->timestamp ?? 0;

            if (!$email || $timestamp < (time())) {
                throw new Exception('Token expired or invalid.' . var_export($decoded, true));
            }

            $children = Member::where('email', $email)->get();
            $openEvents = Event::where('openRegistration', 1)->get();

            return [
                'email' => $email,
                'events' => $openEvents->map(fn($e) => [
                    'id' => $e->id,
                    'name' => $e->name,
                    'startDate' => $e->startDate,
                    'endDate' => $e->endDate,
                    'members' => $e->members->map(fn($m) => [
                        'id' => $m->id,
                        'name' => $m->name . ' ' . $m->surname
                        ])
                ])->values()->all(),
                'children' => $children->map(fn($c) => [
                    'id' => $c->id,
                    'name' => $c->name . ' ' . $c->surname
                ])->values()->all()
            ];

        } catch (Exception $e) {
            throw new Exception('Invalid or expired token - ' . $e->getMessage());
        }
    }

    public function registerToEvent(int $eventId, $memberId, string $token) {
        if (!V::intVal()->validate($eventId) || !V::intVal()->validate($memberId)) {
            throw new InputNotValidException('Event ID or Member ID is not valid.');
        }

        $data = $this->verifyToken($token);

        $email = $data['email'];
        $children = array_column($data['children'], 'id');

        if (!in_array($memberId, $children)) {
            throw new InputNotValidException('Member does not belong to this email.');
        }

        $event = Event::find($eventId);
        if ($event == null || $event->openRegistration != 1) {
            throw new InputNotValidException('Event not found or registration is closed.');
        }

        $member = Member::find($memberId);
        $event->members()->save($member);

        return true;
    }

    public function registerByEmail(int $eventId, string $childName, string $token) {
        if (!V::intVal()->validate($eventId) || !V::alnumCZ()->validate($childName)) {
            throw new InputNotValidException('Event ID or Child Name is not valid.');
        }

        $data = $this->verifyToken($token);

        // get event name
        $event = Event::find($eventId);
        if ($event == null || $event->openRegistration != 1) {
            throw new InputNotValidException('Event not found or registration is closed.');
        }

        // we do not have member id, so we send email to admin to register manually
        $to = 'zalesakzdanice@seznam.cz';
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = getenv('SMTP_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('SMTP_USER');
            $mail->Password   = getenv('SMTP_PWD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('zalesakzdanice@seznam.cz', 'Registrace na akci');
            $mail->addAddress($to);
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            $mail->isHTML(true);
            $mail->Subject = 'Ruční registrace na akci';

            $body = "Bylo požádáno o ruční registraci na akci pro dítě: <strong>" . htmlspecialchars($childName) . "</strong><br>";
            $body .= "Email rodiče: " . htmlspecialchars($data['email']) . "<br>";
            $body .= "ID a název akce: " . htmlspecialchars((string)$eventId) . " - " . htmlspecialchars((string)$event->name) . "<br>";

            $mail->Body = $body;
            $mail->send();
        } catch (MailException $e) {
            throw new WrongParameterException('email');
        }

        return (object)[
            'success' => true,
            'message' => 'Request for manual registration sent. We will contact you soon.'
        ];
    }

}