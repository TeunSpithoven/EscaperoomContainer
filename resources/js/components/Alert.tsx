import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React, { Fragment, useRef, useState } from "react";
import { Button } from "./Button/Button";

export interface AlertInterface {
	title: string;
	description: string;
	confirmButtonText: string;
	cancelButtonText: string;
	open?: boolean;
	onConfirm?: () => Promise<void>;
	onClose?: () => void;
}

export const Alert: React.FC<AlertInterface> = ({
	title,
	description,
	confirmButtonText,
	cancelButtonText,
	open = false,
	onConfirm,
	onClose,
}) => {
	const close = () => {
		onClose?.();
	};

	const confirm = async () => {
		if (onConfirm === undefined) {
			return;
		}

		await onConfirm();

		onClose?.();
	};

	const typeClassNames = {
		iconColor: "text-red-600",
		iconBackgroundColor: "bg-red-100",
		buttonColor: "red" as const,
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				static
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={close}
			>
				<div className="min-h-fill-available flex items-end justify-center text-center sm:block">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:h-screen sm:align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block transform overflow-hidden bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:rounded-lg sm:align-middle">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div
										className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${typeClassNames.iconBackgroundColor}`}
									>
										<ExclamationIcon
											className={`h-6 w-6 ${typeClassNames.iconColor}`}
											aria-hidden="true"
										/>
									</div>
									<div className="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
										{title !== null && (
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-gray-900"
											>
												{title}
											</Dialog.Title>
										)}
										{description !== null && (
											<div>
												<p className="text-sm text-gray-500">
													{description}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<Button
									className="w-auto! text-white bg-red-700 hover:bg-red-800"
									color={typeClassNames.buttonColor}
									handleClick={() => confirm()}
								>
									{confirmButtonText}
								</Button>

								<div className="h-3 w-3" />

								<Button
									className="w-auto! text-gray-700 bg-gray-200 hover:bg-gray-300"
									handleClick={() => close()}
								>
									{cancelButtonText}
								</Button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
