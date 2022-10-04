import React from "react";
import { FormField } from "../components/FormField/FormField";
import { QuestionInterface } from "../helpers/RoomInterfaces";
import { FormError } from "./FormError";

export const RoomForm: React.FC<{
	data: {
		name: string;
		description: string;
		started_at: string;
		ended_at: string;
		questions: QuestionInterface[];
	};
	errors: Record<
		"name" | "description" | "started_at" | "ended_at" | "questions",
		string
	>;
	handleSubmit: (event: React.SyntheticEvent) => void;
	handleNameChange: (event: React.FormEvent<HTMLInputElement>) => void;
	handleDescriptionChange: (event: React.FormEvent<HTMLInputElement>) => void;
}> = ({
	data,
	errors,
	handleSubmit,
	handleNameChange,
	handleStartedAtChange,
	handleEndedAtChange,
	handleDescriptionChange,
	children,
}) => {
	return (
		<form
			id="roomCreationForm"
			className="space-y-6"
			onSubmit={handleSubmit}
		>
			<div className="rounded-md shadow-sm space-y-4">
				<FormField
					identifier="name"
					value={data.name}
					handleChange={handleNameChange}
				>
					Title
				</FormField>
				<FormError error={errors.name} />

				<FormField
					identifier="description"
					value={data.description}
					handleChange={handleDescriptionChange}
				>
					Description
				</FormField>
				<FormError error={errors.description} />

				<div className="flex w-full space-x-4">
					<div className="flex-1">
						<FormField
							identifier="started_at"
							value={data.started_at}
							required={false}
							placeholder="0000-00-00 00:00:00"
							handleChange={handleStartedAtChange}
						>
							Starts at
						</FormField>
						<FormError error={errors.started_at} />
					</div>

					<div className="flex-1">
						<FormField
							identifier="ended_at"
							value={data.ended_at}
							required={false}
							placeholder="0000-00-00 00:00:00"
							handleChange={handleEndedAtChange}
						>
							Ends at
						</FormField>
						<FormError error={errors.ended_at} />
					</div>
				</div>
			</div>
			{children}
		</form>
	);
};
