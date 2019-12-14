<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use App\Application\Actions\Action;
use App\Domain\Member\MemberRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class MemberAction extends Action
{
    /**
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * @param LoggerInterface $logger
     * @param MemberRepository  $memberRepository
     */
    public function __construct(LoggerInterface $logger, MemberRepository $memberRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->memberRepository = $memberRepository;        
    }
}
