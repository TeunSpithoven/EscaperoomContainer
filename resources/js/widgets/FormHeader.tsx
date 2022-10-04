import React from "react";

export const FormHeader: React.FC = ({ children }) => {
	return (
		<>
			<img
				className="mx-auto py-6 h-18 w-auto"
				src="/images/ROC-Tilburg-logo.png"
				alt="Workflow"
			/>
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
				{children}
			</h2>
		</>
	);
};
