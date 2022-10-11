import { CheckCircleIcon, ClockIcon, PuzzleIcon } from "@heroicons/react/solid";
import React, { ReactElement, useState, useEffect } from "react";
import { Card } from "../components/Card/Card";
import { Panel } from "../components/Panel";
import { Chart as ChartComponent } from "../components/Chart";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";

import { Doughnut, Chart } from "react-chartjs-2";
import { usePage } from "@inertiajs/inertia-react";
import { Page } from "@inertiajs/inertia";

const LABORATORIES_OPENED_THIS_WEEK = [0, 0, 1, 12, 0, 14, 0];

const LABORATORY_LABELS = ["Mathematics", "Robotics", "Geography"];

const LABORATORY_TIMES = [23, 27, 25];

const Dashboard: React.VFC = () => {
	const {
		roomsOpened,
		roomsCompleted,
		averageTime,
		chartSubtitle,
		averageTimeSpentPerType,
		roomsStartedPerType,
	} = usePage<
		Page<{
			roomsOpened: number;
			roomsCompleted: number;
			averageTime: number;
			chartSubtitle: string;
			averageTimeSpentPerType: any;
			roomsStartedPerType: any;
		}>
	>().props;

	return (
		<React.Fragment>
            <div>Hallo react! ik ben Teun. Aangenaam</div>
			<div className="flex space-between space-x-6 mb-6">
				<Card title={`${roomsOpened}`} description="ROOMS STARTED">
					<PuzzleIcon className="w-20 h-20 text-pink-600" />
				</Card>
				<Card title={`${roomsCompleted}`} description="ROOMS COMPLETED">
					<CheckCircleIcon className="w-20 h-20 text-green-500" />
				</Card>
				<Card
					title={`${averageTime} min`}
					description="AVERAGE TIME SPENT"
				>
					<ClockIcon className="w-20 h-20  text-blue-500" />
				</Card>
			</div>

			<div className="flex mb-6 space-x-6">
				<Panel
					title="Rooms started"
					description={chartSubtitle}
					className="flex-1"
				>
					<ChartComponent
						labels={[
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						]}
						xAxisLabel="Day"
						yAxisLabel="Rooms"
						stacked={false}
						dataSets={roomsStartedPerType.map(
							({ roomType, roomsOpenedThisWeek }) => {
								return {
									label: roomType.label,
									data: roomsOpenedThisWeek,
									backgroundColor: `rgba(${roomType.rgb_color}, 0.8)`,
								};
							}
						)}
					/>
				</Panel>

				<Panel
					title="Rooms started"
					description={chartSubtitle}
					className="flex-none"
				>
					<Doughnut
						data={{
							labels: roomsStartedPerType.map(
								({ roomType }) => roomType.label
							),
							datasets: [
								{
									label: "Created this week",
									data: roomsStartedPerType.map(
										({ roomsOpenedThisWeek }) =>
											roomsOpenedThisWeek.reduce(
												(sum, next) => sum + next
											),
										0
									),
									backgroundColor: roomsStartedPerType.map(
										({ roomType }) =>
											`rgba(${roomType.rgb_color}, 0.9)`
									),
									borderColor: roomsStartedPerType.map(
										({ roomType }) =>
											`rgba(${roomType.rgb_color}, 1)`
									),
									borderWidth: 1,
								},
							],
						}}
					/>
				</Panel>
			</div>

			<div className="flex flex-col space-y-6">
				{averageTimeSpentPerType.map(
					({ roomType, roomLabels, roomTimes }, index) => {
						return (
							<Panel
								key={index}
								title="Average time spent"
								description={`Average time to complete each room of type - ${roomType.label}`}
								className="relative h-[480px] w-full"
								contentStyling="h-[400px]"
							>
								<Chart
									type="bar"
									data={{
										labels: roomLabels,
										datasets: [
											{
												type: "line" as const,
												label: "Total average (min)",
												borderColor:
													"rgb(255, 99, 132)",
												borderWidth: 2,
												fill: false,
												data: roomLabels.map(
													(_) => averageTime
												),
											},
											{
												type: "bar" as const,
												label: "Average time (min)",
												backgroundColor: `rgba(${roomType.rgb_color}, 0.9)`,
												data: roomTimes,
												borderColor: "white",
												borderWidth: 2,
											},
										],
									}}
									options={{
										responsive: true,
										maintainAspectRatio: false,
										plugins: {
											legend: { position: "right" },
										},
									}}
								/>
							</Panel>
						);
					}
				)}
			</div>
		</React.Fragment>
	);
};

(Dashboard as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>;
};

export default Dashboard;
