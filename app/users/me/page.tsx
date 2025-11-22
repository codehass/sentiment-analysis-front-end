"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
	User,
	Mail,
	KeySquare,
	Save,
	Loader2,
	LogOut,
	CheckCircle,
	AlertTriangle,
} from "lucide-react";

// Define a type for the user data for clarity
type UserProfile = {
	username: string;
	email: string;
	name: string;
};

export default function MePage() {
	const [user, setUser] = useState<UserProfile | null>(null);
	// Separate state for original user data to check for unsaved changes
	const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setError("No token found. Redirecting to login...");
			setLoading(false);
			// Delayed redirect for better UX
			setTimeout(() => router.push("/login"), 1500);
			return;
		}

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
				setOriginalUser(data); // Set original data
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.push("/login");
	};

	const hasChanges =
		user && originalUser
			? user.name !== originalUser.name ||
			  user.username !== originalUser.username ||
			  user.email !== originalUser.email
			: false;

	const handleSave = async () => {
		if (!user) return;

		setSaving(true);
		setSuccess(null);
		setError(null);

		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Not authenticated");

			const response = await fetch("/api/users/me", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					username: user.username,
					email: user.email,
					name: user.name,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.detail || "Failed to update user.");
			}

			// Update original user state to reflect saved changes
			setOriginalUser(user);
			setSuccess("Profile updated successfully!");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setSaving(false);
			// Clear success message after a delay
			setTimeout(() => setSuccess(null), 3000);
		}
	};

	// --- Render States ---

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
				<span className="text-xl text-gray-600">Loading profile...</span>
			</div>
		);

	if (error && !user)
		// Only show full error if user is not loaded at all
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

	if (!user) return null; // Should ideally be caught by error/loading, but as a safeguard

	// --- Main Component Render ---
	return (
		<div
			className={cn("flex justify-center min-h-screen bg-gray-50 py-16 px-4")}
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

						{/* Field Grid */}
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
									value={user.name || ""}
									onChange={(e) => setUser({ ...user, name: e.target.value })}
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
									value={user.username || ""}
									onChange={(e) =>
										setUser({ ...user, username: e.target.value })
									}
									className="border-gray-300 focus:border-blue-500"
									readOnly={true} // Common practice to keep username read-only
									disabled={true} // Add disabled style
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
									value={user.email || ""}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
									className="border-gray-300 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Feedback Section */}
					{(success || error) && (
						<div
							className={cn(
								"p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-300",
								success
									? "bg-green-50 border border-green-200 text-green-700"
									: "bg-red-50 border border-red-200 text-red-700"
							)}
						>
							{success ? (
								<CheckCircle className="h-5 w-5 flex-shrink-0" />
							) : (
								<AlertTriangle className="h-5 w-5 flex-shrink-0" />
							)}
							<p className="text-sm font-medium">{success || error}</p>
						</div>
					)}

					{/* Action Buttons */}
					<div className="pt-4 border-t border-gray-100 space-y-4">
						<Button
							onClick={handleSave}
							disabled={saving || !hasChanges}
							className="w-full h-10 text-md font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
						>
							{saving ? (
								<div className="flex items-center space-x-2">
									<Loader2 className="h-5 w-5 animate-spin" />
									<span>Saving...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<Save className="h-5 w-5" />
									<span>Save Changes</span>
								</div>
							)}
						</Button>

						<Button
							onClick={handleLogout}
							variant="destructive"
							className="w-full h-10 text-md font-semibold bg-red-600 hover:bg-red-700 transition-colors duration-200"
						>
							<div className="flex items-center space-x-2">
								<LogOut className="h-5 w-5" />
								<span>Log Out</span>
							</div>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
