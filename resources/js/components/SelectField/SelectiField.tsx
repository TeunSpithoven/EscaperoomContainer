import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface SelectFieldItemIterface {
	label: string;
	subLabel: string;
	value: string;
	disabled: boolean;
}

interface SelectFieldInterface {
	label: string;
	items: SelectFieldItemIterface[];
	setState: (value: string) => void;
	required?: boolean;
}

export const SelectField: React.VC<SelectFieldInterface> = ({
	label,
	items,
	setState,
	required = true,
}) => {
	const [selected, setSelected] = useState(items[0]);

	useEffect(() => {
		setState(selected.value);
	}, [selected]);

	return (
		<div>
			<label className="text-sm text-gray-800">
				{label}
				{!required && (
					<span className="text-xs font-medium text-gray-400">
						(optional)
					</span>
				)}
			</label>
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-pink-300 sm:text-sm">
						<span className="block truncate">{selected.label}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{items.map((item, index) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`relative select-none py-2 pl-10 pr-4 ${
											active
												? "bg-pink-50 text-pink-900"
												: "text-gray-900"
										}`
									}
									value={item}
									disabled={item.disabled}
								>
									{({ selected }) => {
										return (
											<>
												<span
													className={`block truncate cursor-pointer ${
														selected
															? "font-medium"
															: "font-normal"
													} ${
														item.disabled
															? "cursor-default"
															: "cursor-pointer"
													}`}
												>
													{item.label}
													{item.subLabel !== "" && (
														<span className="text-gray-500">
															{" "}
															- {item.subLabel}
														</span>
													)}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										);
									}}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};
