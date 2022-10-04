import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { ReactElement, useState, useEffect } from "react";
import { HasMany } from "../../components/HasMany/HasMany";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";
import { RoomForm } from "../../widgets/RoomForm";
import { QuestionInterface } from "../../helpers/RoomInterfaces";
import { SelectField } from "../../components/SelectField/SelectiField";
import { Page } from "@inertiajs/inertia";

const CreatePage: React.FC = () => {
	const { roomTypes } = usePage<
		Page<{
			roomTypes: {
				id: number;
				identifier: string;
				label: string;
				question_count: number;
			}[];
		}>
	>().props;

	const { data, setData, post, processing, errors } = useForm<{
		name: string;
		description: string;
		started_at: string;
		ended_at: string;
		questions: QuestionInterface[];
		room_type: number;
	}>({
		name: "",
		description: "",
		started_at: "",
		ended_at: "",
		questions: [],
		room_type: 1,
	});

	const [selectedRoomType, setSelectedRoomType] = useState(null);

	useEffect(() => {
		setSelectedRoomType(
			roomTypes.find((roomType) => roomType.id === data.room_type)
		);
	}, [data]);

	function handleSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		post("/rooms/create");
	}

	return (
		<Panel
			title="Create new room"
			footer={
				<Button
					type="submit"
					className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
					disabled={processing}
					form="roomCreationForm"
				>
					Create
				</Button>
			}
		>
			<RoomForm
				data={data}
				errors={errors}
				handleSubmit={handleSubmit}
				handleNameChange={(event: React.FormEvent<HTMLInputElement>) =>
					setData("name", event.target.value.toString())
				}
				handleDescriptionChange={(
					event: React.FormEvent<HTMLInputElement>
				) => setData("description", event.target.value.toString())}
				handleStartedAtChange={(
					event: React.FormEvent<HTMLInputElement>
				) => setData("started_at", event.target.value.toString())}
				handleEndedAtChange={(
					event: React.FormEvent<HTMLInputElement>
				) => setData("ended_at", event.target.value.toString())}
			>
				<SelectField
					label="Room type"
					items={[
						...roomTypes.map((roomType) => {
							return {
								label: roomType.label,
								subLabel: `${roomType.question_count} questions`,
								value: roomType.id.toString(),
								disabled: false,
							};
						}),
						{
							label: "More coming soon...",
							subLabel: "",
							value: "",
							disabled: true,
						},
					]}
					setState={(value: string) => {
						setData("room_type", Number(value));
					}}
				/>
				<HasMany
					error={errors.questions}
					maxItemsCount={selectedRoomType?.question_count}
					setState={(questions: QuestionInterface[]) => {
						setData("questions", questions);
					}}
				/>
			</RoomForm>
		</Panel>
	);
};

(CreatePage as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="Create new room">
			{page}
		</AuthenticatedLayout>
	);
};

export default CreatePage;
