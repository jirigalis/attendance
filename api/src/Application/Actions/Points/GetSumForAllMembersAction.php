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
		$params = $this->request->getQueryParams();
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
			$this->logger->info("Get Sum Points for all members with query params: ". var_export($params, true));
			if ($params["currentSchoolyear"] == 'false' && $params["schoolyearSum"] == 'false') {
				$this->logger->info("No filters");
				$data = $this->pointsRepository->getSumForAllMembers();
			} else if($params["currentSchoolyear"] == 'true' && $params["schoolyearSum"] == 'false') {
				$this->logger->info("Overall sum, schoolyear members filtered");
				$data = $this->pointsRepository->getOverallSumForAllMembersBySchoolyear($params["schoolyearId"]);
			} else {
				$this->logger->info("Schoolyear and points filtered");
				$data = $this->pointsRepository->getSumForAllMembersBySchoolyear($params["schoolyearId"]);
			}
		}

		return $this->respondWithData($data);
	}
}