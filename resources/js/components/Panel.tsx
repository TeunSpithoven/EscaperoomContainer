import React, { ReactElement } from "react";

interface PanelInterface {
	title?: string | null;
	description?: string | null;
	noPadding?: boolean;
	footer?: ReactElement;
	actions?: ReactElement;
	className?: string;
	contentStyling?: string;
}

export const Panel: React.FC<PanelInterface> = ({
	title = null,
	description = null,
	noPadding = false,
	footer = null,
	actions = null,
	className = "",
	contentStyling = "",
	children,
}) => {
	return (
		<div className={`bg-white shadow lg:rounded-md ${className}`}>
			{(title !== null || description !== null || actions !== null) && (
				<div className="flex items-center border-b border-gray-200">
					<div className="flex-1 px-4 py-4 sm:space-y-1 sm:px-6 sm:py-5">
						{title !== null && (
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								{title}
							</h3>
						)}
						{description !== null && (
							<p className="text-sm text-gray-500">
								{description}
							</p>
						)}
					</div>

					{actions !== null && (
						<div className="flex items-center space-x-3 pr-4">
							{actions}
						</div>
					)}
				</div>
			)}

			<div className={noPadding ? "" : `p-4 sm:p-6 ${contentStyling}`}>
				{children}
			</div>

			{footer !== null && (
				<div className="flex space-x-3 justify-end bg-gray-50 px-4 py-3 sm:px-6 lg:rounded-b-md">
					{footer}
				</div>
			)}
		</div>
	);
};
