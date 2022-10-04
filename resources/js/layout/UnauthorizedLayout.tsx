import React from "react";

export const UnauthorizedLayout: React.FC = ({ children }) => {
	return (
		<div className="flex h-screen">
			<div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">{children}</div>
			</div>
			<div
				className="flex-1 bg-cover bg-center"
				style={{ backgroundImage: "url(/images/ROC_Tilburg.png)" }}
			></div>
		</div>
	);
};
