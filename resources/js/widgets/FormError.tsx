import React from "react";

interface FormErrorInterface {
	error: string;
}

export const FormError: React.VFC<FormErrorInterface> = ({ error }) => {
	if (error === undefined || error === "") {
		return <></>;
	}

	return <div className="text-sm text-red-500 px-1">{error}</div>;
};
