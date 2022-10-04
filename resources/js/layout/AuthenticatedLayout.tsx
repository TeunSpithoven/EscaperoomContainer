import React from "react";

import {
	BellIcon,
	HomeIcon,
	UserGroupIcon,
	PuzzleIcon,
	CalendarIcon,
	ChartBarIcon,
} from "@heroicons/react/outline";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { classNames } from "../helpers/classNames";
import { UserMenu } from "../components/UserMenu";
import { Page } from "@inertiajs/inertia";

interface AuthenticatedLayoutInterface {
	title: string;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutInterface> = ({
	title,
	children,
}) => {
	const { url: currentUrl } = usePage<Page>();

	const navigation = [
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: HomeIcon,
		},
		{ name: "Rooms", href: "/rooms", icon: PuzzleIcon },
		// [M-113]: Hide these pages until they are implemented
		// { name: "Students", href: "#", icon: UserGroupIcon },
		{ name: "Timeline", href: "/timeline", icon: CalendarIcon },
		{ name: "Reports", href: "#", icon: ChartBarIcon },
	];

	return (
		<>
			<Head title={title} />
			<div className="flex h-screen bg-gray-50">
				<aside className="h-full w-[300px] bg-gray-800">
					<Link href="/dashboard">
						<img
							className="w-48 mx-auto py-6"
							src="/images/ROC-Tilburg-logo.png"
							alt="ROC-Tilburg-logo"
						/>
					</Link>

					<nav className="flex flex-col mx-2 space-y-2">
						{navigation.map((navigationItem) => {
							const Icon = navigationItem.icon;
							const isActive =
								navigationItem.href.startsWith(currentUrl);

							return (
								<Link
									key={navigationItem.name}
									href={navigationItem.href}
									className={classNames(
										isActive
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={isActive ? "page" : undefined}
								>
									<Icon
										className="h-6 w-6"
										aria-hidden="true"
									/>
									<div>{navigationItem.name}</div>
								</Link>
							);
						})}
					</nav>
				</aside>

				<main className="flex flex-col h-full w-full overflow-y-scroll">
					<header className="bg-white shadow">
						<div className="h-16  ml-4 flex items-center justify-end md:ml-6">
							<div className="flex items-center justify-center mx-8">
								<button
									type="button"
									className="p-1 rounded-full text-gray-400 hover:text-gray-500"
								>
									<span className="sr-only">
										View notifications
									</span>
									<BellIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>

								<UserMenu />
							</div>
						</div>
					</header>

					<div className="w-full py-6 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
			</div>
		</>
	);
};
