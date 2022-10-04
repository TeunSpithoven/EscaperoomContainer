import React from "react";

interface CardInterface {
	title: string;
	description: string;
}

export const Card: React.FC<CardInterface> = ({
	title,
	description,
	children,
}) => {
	return (
		<div className="flex flex-1 p-6 bg-white shadow lg:rounded-md">
			<div className="flex flex-col justify-center flex-1 space-y-1 px-4">
				<span className="text-4xl font-semibold text-gray-800 ">
					{title}
				</span>
				<span className="text-lg font-medium text-gray-600 uppercase">
					{description}
				</span>
			</div>
			<div className="flex items-center justify-end flex-1 px-4">
				{children}
			</div>
		</div>
	);
};
