import React from "react";

interface ExtraFormFieldsInterface {
	checkBoxValue: boolean;
	handleCheckBoxChange: () => void;
}

export const ExtraFormFields: React.VFC<ExtraFormFieldsInterface> = ({
	checkBoxValue,
	handleCheckBoxChange,
}) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<input
					id="remember"
					name="remember"
					type="checkbox"
					className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					checked={checkBoxValue}
					onChange={handleCheckBoxChange}
				/>
				<label
					htmlFor="remember"
					className="ml-2 block text-sm text-gray-900"
				>
					Remember me
				</label>
			</div>

			<div className="text-sm">
				<a
					href="#"
					className="font-medium text-pink-600 hover:text-pink-500"
				>
					Forgot your password?
				</a>
			</div>
		</div>
	);
};
