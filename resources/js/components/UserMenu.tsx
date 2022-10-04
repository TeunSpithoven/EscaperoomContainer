import { Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import React, { Fragment } from "react";
import { classNames } from "../helpers/classNames";
import { Inertia } from "@inertiajs/inertia";

export const UserMenu: React.VFC = () => {
	const user = {
		name: "Tom Cook",
		email: "tom@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	};

	const userNavigation = [
		{ name: "Your Profile", href: "#" },
		{ name: "Settings", href: "#" },
	];

	function handleLogout(event) {
		event.preventDefault();
		Inertia.post("/logout");
	}

	return (
		<Menu as="div" className="ml-3 relative">
			<div>
				<Menu.Button className="max-w-xs bg-gray-300 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white">
					<span className="sr-only">Open user menu</span>
					<img
						className="h-8 w-8 rounded-full"
						src={user.imageUrl}
						alt=""
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					{userNavigation.map((item) => (
						<Menu.Item key={item.name}>
							{({ active }) => (
								<Link
									href={item.href}
									className={classNames(
										active ? "bg-gray-100" : "",
										"block px-4 py-2 text-sm text-gray-700"
									)}
								>
									{item.name}
								</Link>
							)}
						</Menu.Item>
					))}

					<Menu.Item key="sign-out">
						{({ active }) => (
							<form onSubmit={handleLogout}>
								<button
									type="submit"
									className={classNames(
										active ? "bg-gray-100" : "",
										"block w-full text-left px-4 py-2 text-sm text-gray-700"
									)}
								>
									Sign out
								</button>
							</form>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
