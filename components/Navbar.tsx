"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation"; // 1. Switched to usePathname
import { useState, useEffect } from "react";

function Navbar() {
	const router = useRouter();
	const pathname = usePathname(); // 2. Get the current pathname
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setTimeout(
				() => setIsAuthenticated(Boolean(localStorage.getItem("token"))),
				0
			);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.replace("/login");
	};

	const isAuthPage = pathname === "/login" || pathname === "/register";

	return (
		<nav className="sticky top-0 z-10 w-full bg-white shadow-md border-b border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link
						href="/"
						className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
					>
						<Zap className="h-6 w-6 text-blue-600" />
						<span>Sentiment Analyzer</span>
					</Link>
					<div className="flex items-center space-x-4">
						{isAuthenticated ? (
							<Button
								onClick={handleLogout}
								variant="ghost"
								className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
							>
								Logout
							</Button>
						) : (
							!isAuthPage && (
								<div className="flex space-x-2">
									<Link href="/register" passHref>
										<Button
											variant="ghost"
											className="text-gray-500 hover:text-blue-600"
										>
											Register
										</Button>
									</Link>
									<Link href="/login" passHref>
										<Button
											variant="ghost"
											className="text-gray-500 hover:text-blue-600"
										>
											Login
										</Button>
									</Link>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
