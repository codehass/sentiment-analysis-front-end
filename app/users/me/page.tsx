"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, KeySquare, User, Mail, AlertTriangle } from "lucide-react";
import useAuth from "@/hooks/useAuth";

type UserProfile = {
	username: string;
	email: string;
	name: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MePage() {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();
	const isAuthenticated = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			const token = localStorage.getItem("token");

			// fetch(`${BACKEND_URL}/users/me`, {
			fetch("/api/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(async (res) => {
					if (!res.ok) {
						const errorData = await res.json().catch(() => null);
						throw new Error(errorData?.detail || "Failed to fetch user data.");
					}
					return res.json();
				})
				.then((data: UserProfile) => {
					setUser(data);
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		}
	}, [isAuthenticated]);

	if (isAuthenticated === null) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
				<span className="text-xl text-gray-600">Loading profile...</span>
			</div>
		);
	}

	if (isAuthenticated === false) {
		return null;
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
				<span className="text-xl text-gray-600">Loading profile...</span>
			</div>
		);
	}

	if (error && !user) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
				<AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
				<p className="text-xl text-red-600 text-center">{error}</p>
				<Button
					onClick={() => router.push("/login")}
					className="mt-6 bg-blue-600 hover:bg-blue-700"
				>
					Go to Login
				</Button>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"flex flex-col justify-center items-center h-screen bg-gray-50 py-16 px-4"
			)}
		>
			<Card className="w-full max-w-2xl shadow-2xl border-none rounded-xl">
				<CardHeader className="p-6 border-b border-gray-100">
					<div className="flex items-center space-x-4">
						<KeySquare className="h-8 w-8 text-blue-600" />
						<div>
							<CardTitle className="text-3xl font-bold text-gray-900">
								Account Settings
							</CardTitle>
							<p className="text-sm text-gray-500 mt-1">
								Manage your profile details and security settings.
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-6 space-y-8">
					{/* Profile Fields Section */}
					<div className="space-y-6">
						<h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
							Personal Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label
									className="text-gray-700 flex items-center space-x-2"
									htmlFor="name"
								>
									<User className="h-4 w-4 text-gray-400" />
									<span>Full Name</span>
								</Label>
								<Input
									id="name"
									value={user?.name || ""}
									onChange={(e) =>
										setUser((prev) =>
											prev ? { ...prev, name: e.target.value } : prev
										)
									}
									className="border-gray-300 focus:border-blue-500"
								/>
							</div>

							<div className="space-y-2">
								<Label
									className="text-gray-700 flex items-center space-x-2"
									htmlFor="username"
								>
									<KeySquare className="h-4 w-4 text-gray-400" />
									<span>Username</span>
								</Label>
								<Input
									id="username"
									value={user?.username || ""}
									onChange={(e) =>
										setUser((prev) =>
											prev ? { ...prev, username: e.target.value } : prev
										)
									}
									className="border-gray-300 focus:border-blue-500"
									readOnly
									disabled
								/>
								<p className="text-xs text-gray-500 mt-1">
									Username is permanent and cannot be changed.
								</p>
							</div>

							<div className="space-y-2">
								<Label
									className="text-gray-700 flex items-center space-x-2"
									htmlFor="email"
								>
									<Mail className="h-4 w-4 text-gray-400" />
									<span>Email Address</span>
								</Label>
								<Input
									id="email"
									type="email"
									value={user?.email || ""}
									onChange={(e) =>
										setUser((prev) =>
											prev ? { ...prev, email: e.target.value } : prev
										)
									}
									className="border-gray-300 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
