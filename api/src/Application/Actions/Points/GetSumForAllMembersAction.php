<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class GetSumForAllMembersAction extends PointsAction
{
	
	protected function action(): Response
	{

		$role = null;
		$schoolyearId = null;
		if (isset($this->args["role"])) {
			$role = $this->args["role"];
		}
		if (isset($this->args["schoolyearId"])) {
			$schoolyearId = (int) $this->args["schoolyearId"];
		}
		if ($role) {
			$this->logger->info("Get Sum Points for all members by role " . $role);
			$data = $this->pointsRepository->getSumForAllMembersByRole($role);
		} else if ($schoolyearId) {
			$this->logger->info("Get Sum Points for all members by schoolyearId $schoolyearId.");
			$data = $this->pointsRepository->getSumForAllMembersBySchoolyear($schoolyearId);
		} else {
			$this->logger->info("Get Sum Points for all members without filters.");
			$data = $this->pointsRepository->getSumForAllMembers();
		}

		return $this->respondWithData($data);
	}
}