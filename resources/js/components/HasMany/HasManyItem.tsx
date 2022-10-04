import React from "react";

import { XIcon } from "@heroicons/react/outline";
import { HasManyItemAnswerInterface } from "./helpers/HasManyInterfaces";
import { classNames } from "../../helpers/classNames";

export const HasManyItem: React.VFC<{
	index: number;
	value: string;
	answers: HasManyItemAnswerInterface[];
	updateItem: (event: any) => void;
	updateAnswer: (event: any, answerIndex: number) => void;
	removeItem: () => void;
}> = ({ index, value, updateItem, updateAnswer, removeItem, answers }) => (
	<div className="flex flex-col space-y-2 rounded bg-gray-50 text-sm p-2">
		<div className="relative">
			<div className="px-2">{index + 1}. Question:</div>
			<input
				type="text"
				name="question"
				value={value}
				required
				className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				onChange={(event) => {
					updateItem(event);
				}}
			/>
			<XIcon
				onClick={() => {
					removeItem();
				}}
				className="absolute inset-y-0 text-gray-700 right-0 h-5 w-5 mx-2 my-[29px] cursor-pointer hover:text-pink-800"
			/>
		</div>
		<div className="flex flex-col">
			<div className="px-2">Answers:</div>
			<div className="flex space-x-2">
				{answers.map((answer, index) => (
					<input
						key={index}
						type="text"
						value={answer.value}
						required
						className={classNames(
							answer.isCorrect
								? "focus:border-green-500"
								: "focus:border-indigo-500",
							"flex-1 appearance-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
						)}
						onChange={(event) => {
							updateAnswer(event, index);
						}}
					/>
				))}
			</div>
		</div>
	</div>
);
