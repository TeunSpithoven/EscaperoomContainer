import { Head } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { Button } from "../components/Button/Button";
import { FormField } from "../components/FormField/FormField";
import { UnauthorizedLayout } from "../layout/UnauthorizedLayout";
import { ExtraFormFields } from "../widgets/ExtraFormFields";
import { FormError } from "../widgets/FormError";
import { FormHeader } from "../widgets/FormHeader";

const Login: React.VFC = () => {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false,
		credentials: "",
	});

	function handleSubmit(event) {
		event.preventDefault();
		post("/login");
	}

	return (
		<>
			<Head title="Login" />
			<UnauthorizedLayout>
				<FormHeader>Sign in to your account</FormHeader>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<FormField
							identifier="email"
							type="email"
							value={data.email}
							handleChange={(event) =>
								setData("email", event.target.value.toString())
							}
							autocomplete="email"
						>
							Email address
						</FormField>
						<FormField
							identifier="password"
							type="password"
							value={data.password}
							handleChange={(event) =>
								setData(
									"password",
									event.target.value.toString()
								)
							}
						>
							Password
						</FormField>
					</div>
					<FormError error={errors.credentials} />

					<ExtraFormFields
						checkBoxValue={data.remember}
						handleCheckBoxChange={(event) =>
							setData("remember", event.target.checked)
						}
					/>

					<div className="space-y-2">
						<Button
							className="text-white bg-pink-700 hover:bg-pink-800"
							type="submit"
							disabled={processing}
						>
							Sign in
						</Button>

						<Button
							className="text-pink-700 hover:bg-pink-100"
							href="/register"
						>
							Don't have an account? Sign up
						</Button>
					</div>
				</form>
			</UnauthorizedLayout>
		</>
	);
};

export default Login;
