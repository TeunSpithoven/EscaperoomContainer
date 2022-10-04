import React from "react";

interface ButtonInterface {
	type: "button" | "submit";
	href: string | null;
	className?: string;
	form?: string | undefined;
	disabled?: boolean;
	handleClick?: () => void;
}

export const Button: React.FC<ButtonInterface> = ({
	type = "button",
	href = null,
	className,
	disabled = false,
	form = undefined,
	handleClick,
	children,
}) => {
	const Tag = href === null ? "button" : "a";
	const styles =
		"w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-indigo-500 transition ease-in-out duration-500";

	return (
		<Tag
			className={`${styles} ${className}`}
			type={type}
			href={href}
			form={form}
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</Tag>
	);
};
