import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/outline";
import { Page } from "@inertiajs/inertia";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import React, { ReactElement, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { Alert } from "../../components/Alert";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";

const IndexPage: React.VFC = () => {
	const { rooms } = usePage<
		Page<{
			rooms: {
				id: number;
				name: string;
				description: string;
				access_code: string;
				room_type: {
					id: number;
					identifier: string;
					label: string;
					question_count: number;
				};
				created_at: string;
			}[];
		}>
	>().props;

	const [showAccessCodesFor, setShowAccessCodesFor] = useState<number[]>([]);

	const [deleteAlertId, setDeleteAlertId] = useState<number | null>(null);

	const { post } = useForm();

	const handleDelete = (id: number) => {
		post(`/rooms/${id}/delete`);
	};

	const toggleAccessCode = (roomId: number) => {
		setShowAccessCodesFor((previousShowAccessCodesFor) => {
			if (previousShowAccessCodesFor.includes(roomId)) {
				return previousShowAccessCodesFor.filter((id) => id !== roomId);
			}

			return [...previousShowAccessCodesFor, roomId];
		});
	};
	return (
		<Panel
			title="Rooms"
			actions={
				<Button
					className="w-auto text-white bg-pink-700 hover:bg-pink-800"
					href="/rooms/create"
				>
					Create new room
				</Button>
			}
			noPadding={true}
		>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
						>
							Title
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
						>
							Type
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
						>
							Description
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
						>
							Access code
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 whitespace-nowrap"
						>
							Creation date
						</th>
						<th className="w-[0.1%]" />
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{rooms.map(
						({
							id,
							name,
							description,
							room_type,
							access_code,
							created_at,
						}) => (
							<tr key={id} className="h-[59px]">
								<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
									{name}
								</td>
								<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
									{room_type.label}
								</td>
								<td className="px-4 text-sm sm:px-6 text-gray-900">
									{description}
								</td>
								<td className="px-4 text-sm sm:px-6 text-gray-900 font-medium">
									<div className="flex items-center space-x-1">
										<span>
											{showAccessCodesFor.includes(id)
												? access_code
												: "••••••"}
										</span>
										<button
											type="button"
											className="text-gray-600 hover:text-gray-500"
											onClick={() => toggleAccessCode(id)}
										>
											{showAccessCodesFor.includes(id) ? (
												<EyeOffIcon className="w-5 h-5" />
											) : (
												<EyeIcon className="w-5 h-5" />
											)}
										</button>
									</div>
								</td>
								<td className="whitespace-nowrap px-4 text-sm sm:px-6 text-gray-900">
									{created_at.split("T")[0]}
								</td>
								<td className="px-4 text-sm sm:px-6">
									<div className="flex items-center space-x-4">
										<Link
											className="responsive-text-align text-sm font-medium transition duration-150 text-rose-600 hover:text-rose-500"
											href={`/rooms/${id}/dashboard`}
										>
											View
										</Link>
										<Link
											className="responsive-text-align text-sm font-medium transition duration-150 text-rose-600 hover:text-rose-500"
											href={`/rooms/${id}/edit`}
										>
											Edit
										</Link>
										<button
											className="responsive-text-align text-sm font-medium transition duration-150 text-black hover:text-rose-500"
											type="button"
											onClick={() => setDeleteAlertId(id)}
										>
											<XIcon className=" w-5 h-5" />
										</button>
									</div>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>

			<Alert
				title="Are you sure?"
				description="This will be irreversible."
				confirmButtonText="Delete"
				cancelButtonText="Cancel"
				open={deleteAlertId !== null}
				onConfirm={() => handleDelete(deleteAlertId)}
				onClose={() => setDeleteAlertId(null)}
			/>
		</Panel>
	);
};

(IndexPage as any).layout = (page: ReactElement) => {
	return <AuthenticatedLayout title="Rooms">{page}</AuthenticatedLayout>;
};

export default IndexPage;
