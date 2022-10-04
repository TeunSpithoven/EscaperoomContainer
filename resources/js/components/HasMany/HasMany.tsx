import { PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { FormError } from "../../widgets/FormError";
import { Button } from "../Button/Button";
import { HasManyItem } from "./HasManyItem";
import { HasManyItemInterface } from "./helpers/HasManyInterfaces";

export const HasMany: React.VFC<{
	setState: (items: HasManyItemInterface[]) => void;
	error: string;
	maxItemsCount: number;
	initialItems?: HasManyItemInterface[];
}> = ({ initialItems = [], setState, error, maxItemsCount }) => {
	const [items, setItems] = useState<HasManyItemInterface[]>([
		...initialItems,
	]);

	useEffect(() => {
		setState(items);
	}, [items]);

	const updateItem = (index: number, value: string) => {
		const newItems = JSON.parse(JSON.stringify(items));
		newItems[index].value = value;
		setItems(newItems);
	};

	const updateAnswer = (
		questionIndex: number,
		answerIndex: number,
		value: string
	) => {
		const newItems: HasManyItemInterface[] = JSON.parse(
			JSON.stringify(items)
		);
		newItems[questionIndex].answers[answerIndex].value = value;
		setItems(newItems);
	};

	const removeItem = (index: number) => {
		setItems(items.filter((_, itemIndex) => itemIndex !== index));
	};

	return (
		<div className="text-gray-800 border border-gray-50 shadow px-4 py-1 rounded">
			<div className="flex items-center justify-between">
				<div>Questions</div>
				<div>
					<Button
						className={`!w-auto text-white ${
							items.length >= maxItemsCount
								? "bg-gray-500 cursor-not-allowed"
								: "bg-pink-700 hover:bg-pink-800"
						}`}
						handleClick={() => {
							if (items.length >= maxItemsCount) {
								return;
							}
							setItems([
								...items,
								{
									id: null,
									value: "",
									answers: [
										{
											id: null,
											value: "",
											isCorrect: true,
										},
										{
											id: null,
											value: "",
											isCorrect: false,
										},
										{
											id: null,
											value: "",
											isCorrect: false,
										},
										{
											id: null,
											value: "",
											isCorrect: false,
										},
									],
								},
							]);
						}}
					>
						<PlusIcon className="h-6 w-4" />
					</Button>
				</div>
			</div>
			<FormError error={error} />

			<div className="py-4 space-y-4">
				{items.map((item, index) => {
					return (
						<HasManyItem
							key={index}
							index={index}
							value={item.value}
							answers={item.answers}
							updateItem={(event) => {
								updateItem(index, event.target.value);
							}}
							updateAnswer={(event, answerIndex) => {
								updateAnswer(
									index,
									answerIndex,
									event.target.value
								);
							}}
							removeItem={() => {
								removeItem(index);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
