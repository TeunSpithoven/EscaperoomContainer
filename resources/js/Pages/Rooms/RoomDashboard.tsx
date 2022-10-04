import {
	CheckCircleIcon,
	ClockIcon,
	InformationCircleIcon,
	PuzzleIcon,
	SortAscendingIcon,
	SortDescendingIcon,
} from "@heroicons/react/solid";
import { Page } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { ReactElement, useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";

const RoomDashboard: React.VFC = () => {
	const [state, setState] = useState({
		minTime: 0,
		maxTime: 0,
		averageTime: 0,
	});

	const { room, questionCount, results, roomsOpened } = usePage<
		Page<{
			room: any;
			questionCount: number;
			results: {
				id: number;
				room_id: number;
				name: string;
				invalid_attempts: number;
				completion_time: number;
				created_at: string;
			}[];
			roomsOpened: number;
		}>
	>().props;

	useEffect(() => {
		if (results.length <= 0) {
			return;
		}

		const minTime = results.reduce(
			(current, next) =>
				current < next.completion_time ? current : next.completion_time,
			1000000000
		);
		const maxTime = results.reduce(
			(current, next) =>
				current > next.completion_time ? current : next.completion_time,
			0
		);

		const averageTime = (
			results.reduce(
				(current, next) => current + next.completion_time,
				0
			) / results.length
		).toFixed(1);

		setState({ minTime, maxTime, averageTime });
	}, [results]);

	return (
		<React.Fragment>
			<div className="flex space-between space-x-6 mb-6">
				<Card title={room.name} description={room.room_type.label}>
					<InformationCircleIcon className="w-20 h-20 text-blue-500" />
				</Card>
				<Card
					title={`${state.averageTime} min`}
					description="AVERAGE TIME"
				>
					<ClockIcon className="w-20 h-20 text-blue-500" />
				</Card>
				<Card title={`${state.minTime} min`} description="FASTEST TIME">
					<SortAscendingIcon className="w-20 h-20 text-green-500" />
				</Card>
			</div>

			<div className="flex space-between space-x-6 mb-6">
				<Card title={`${roomsOpened}`} description="ROOMS STARTED">
					<PuzzleIcon className="w-20 h-20 text-pink-600" />
				</Card>
				<Card title={`${results.length}`} description="ROOMS COMPLETED">
					<CheckCircleIcon className="w-20 h-20 text-green-500" />
				</Card>
				<Card title={`${state.maxTime} min`} description="LONGEST TIME">
					<SortDescendingIcon className="w-20 h-20 text-red-600" />
				</Card>
			</div>

			<Panel title="Submissions" noPadding={true}>
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Name
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Invalid attempts count
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Completion time
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
							>
								Submission date
							</th>
							<th className="w-[0.1%]" />
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{results.map(
							({
								id,
								name,
								invalid_attempts,
								completion_time,
								created_at,
							}) => (
								<tr key={id} className="h-[59px]">
									<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
										{name}
									</td>
									<td className="px-4 text-sm sm:px-6 text-gray-900">
										{invalid_attempts}
									</td>
									<td className="px-4 text-sm sm:px-6 text-gray-900 font-medium">
										{completion_time} min
									</td>
									<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
										{created_at.split("T")[0]}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</Panel>
		</React.Fragment>
	);
};

(RoomDashboard as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="RoomDashboard">{page}</AuthenticatedLayout>
	);
};

export default RoomDashboard;
