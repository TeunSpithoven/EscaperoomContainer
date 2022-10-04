import { Head, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { Button } from "../components/Button/Button";
import { FormField } from "../components/FormField/FormField";
import { UnauthorizedLayout } from "../layout/UnauthorizedLayout";
import { FormError } from "../widgets/FormError";
import { FormHeader } from "../widgets/FormHeader";

const Register: React.FC = () => {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		password_confirmation: "",
	});

	function handleSubmit(event) {
		event.preventDefault();
		post("/register");
	}

	return (
		<>
			<Head title="Login" />
			<UnauthorizedLayout>
				<FormHeader>Create new account</FormHeader>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<input type="hidden" name="remember" defaultValue="true" />
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

						<FormError error={errors.email} />

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
							autocomplete="new-password"
						>
							Password
						</FormField>

						<FormError error={errors.password} />

						<FormField
							identifier="password_confirmation"
							type="password"
							value={data.password_confirmation}
							handleChange={(event) =>
								setData(
									"password_confirmation",
									event.target.value.toString()
								)
							}
							autocomplete="new-password"
						>
							Confirm password
						</FormField>
					</div>

					<div className="space-y-2">
						<Button
							className="text-white bg-pink-700 hover:bg-pink-800"
							type="submit"
							disabled={processing}
						>
							Sign up
						</Button>

						<Button
							className="text-pink-700 hover:bg-pink-100"
							href="/login"
						>
							Already have an account? Sign in
						</Button>
					</div>
				</form>
			</UnauthorizedLayout>
		</>
	);
};

export default Register;
