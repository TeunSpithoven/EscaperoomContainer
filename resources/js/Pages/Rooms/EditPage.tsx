import React, { ReactElement } from "react";
import { Page } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";

import { HasMany } from "../../components/HasMany/HasMany";
import { Button } from "../../components/Button/Button";
import { Panel } from "../../components/Panel";
import { AuthenticatedLayout } from "../../layout/AuthenticatedLayout";
import { RoomForm } from "../../widgets/RoomForm";
import { QuestionInterface } from "../../helpers/RoomInterfaces";

const EditPage: React.FC = () => {
	const { room, roomType } = usePage<
		Page<{
			room: {
				id: number;
				name: string;
				description: string;
				started_at: string;
				ended_at: string;
				questions: {
					id: number;
					question: string;
					answers: {
						id: number;
						answer: string;
						is_correct: string;
					}[];
				}[];
			};
			roomType: {
				id: number;
				identifier: string;
				label: string;
				question_count: number;
			};
		}>
	>().props;

	const { data, setData, post, processing, errors } = useForm<{
		name: string;
		description: string;
		started_at: string;
		ended_at: string;
		questions: QuestionInterface[];
	}>({
		name: room.name,
		description: room.description,
		started_at: room.started_at ?? "",
		ended_at: room.ended_at ?? "",
		questions: room.questions.map((question) => ({
			id: question.id,
			value: question.question,
			answers: question.answers.map((answer) => ({
				id: answer.id,
				value: answer.answer,
				isCorrect: answer.is_correct,
			})),
		})),
	});

	function handleSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		post(`/rooms/${room.id}/edit`);
	}

	return (
		<Panel
			title="Update room"
			description={roomType.label}
			footer={
				<Button
					type="submit"
					className="!w-auto text-white bg-pink-700 hover:bg-pink-800"
					disabled={processing}
					form="roomCreationForm"
				>
					Update
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
				<HasMany
					error={errors.questions}
					initialItems={data.questions}
					maxItemsCount={roomType.question_count}
					setState={(questions: QuestionInterface[]) => {
						setData("questions", questions);
					}}
				/>
			</RoomForm>
		</Panel>
	);
};

(EditPage as any).layout = (page: ReactElement) => {
	return (
		<AuthenticatedLayout title="Update room">{page}</AuthenticatedLayout>
	);
};

export default EditPage;
