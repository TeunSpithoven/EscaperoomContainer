import React from "react";

interface FormFieldInterface {
	identifier: string;
	handleChange: () => void;
	value: string;
	required?: boolean;
	type?: string;
	autocomplete?: string;
}

export const FormField: React.FC<FormFieldInterface> = ({
	identifier,
	value,
	handleChange,
	required = true,
	type = "text",
	autocomplete = "off",
	placeholder,
	children,
}) => (
	<div>
		<label htmlFor={identifier} className="text-sm text-gray-800">
			{children}{" "}
			{!required && (
				<span className="text-xs font-medium text-gray-400">
					(optional)
				</span>
			)}
		</label>
		<input
			id={identifier}
			name={identifier}
			type={type}
			autoComplete={autocomplete}
			required={required}
			placeholder={placeholder}
			className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
			value={value}
			onChange={handleChange}
		/>
	</div>
);
