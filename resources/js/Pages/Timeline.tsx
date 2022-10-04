import React, { ReactElement } from "react";
import { AuthenticatedLayout } from "../layout/AuthenticatedLayout";
import Chart from "react-apexcharts";
import { usePage } from "@inertiajs/inertia-react";
import { Page } from "@inertiajs/inertia";

const Timeline: React.FC = () => {
	const { rooms } = usePage<
		Page<{
			rooms: {
				name: string;
				started_at: string;
				ended_at: string;
			}[];
		}>
	>().props;

	const chartHeight = Math.min(rooms.length * 100, 800);

	return (
		<div>
			<Chart
				className="w-full"
				options={{
					plotOptions: {
						bar: {
							horizontal: true,
							distributed: true,
							dataLabels: {
								hideOverflowingLabels: false,
							},
						},
					},
					dataLabels: {
						enabled: true,
						formatter: function (_, options) {
							return options.w.globals.labels[
								options.dataPointIndex
							];
						},

						style: {
							colors: ["#f3f4f5", "#fff"],
						},
					},
					xaxis: {
						type: "datetime",
					},
					yaxis: {
						show: false,
					},
					grid: {
						row: {
							colors: ["#f3f4f5", "#fff"],
							opacity: 1,
						},
					},
				}}
				series={[
					{
						data: rooms.map((room) => ({
							x: room.name,
							y: [
								new Date(room.started_at).getTime(),
								new Date(room.ended_at).getTime(),
							],
							fillColor: "rgb(190, 24, 93)",
						})),
					},
				]}
				type="rangeBar"
				height={chartHeight}
			/>
		</div>
	);
};

(Timeline as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Timeline">{page}</AuthenticatedLayout>;
};

export default Timeline;
