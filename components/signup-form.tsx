"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldGroup,
	FieldLabel,
	// FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Data {
	name: string;
	username: string;
	email: string;
	password: string;
}

export function SignupForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<Data>();
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	async function onSubmit(data: Data) {
		setMessage(null);

		try {
			const response = await fetch("api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				const errorMessage =
					errorData?.detail ||
					errorData?.message ||
					`HTTP error! status: ${response.status}`;

				// Handle field-specific errors if the backend returns them in a known format
				// For now, we'll assume a general error or a 'detail' string
				throw new Error(errorMessage);
			}

			const result = await response.json();
			setMessage({
				type: "success",
				text: "Account created successfully! You can now log in.",
			});
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error.message || "An unexpected error occurred.",
			});
		}
	}

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>Enter your info below.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input
									id="name"
									{...register("name", { required: "Full name is required" })}
									placeholder="Add your full name"
								/>
								{errors.name && (
									<p className="text-sm text-red-500 mt-1">
										{errors.name.message}
									</p>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="username">Username</FieldLabel>
								<Input
									id="username"
									{...register("username", {
										required: "Username is required",
									})}
									placeholder="Add your username"
								/>
								{errors.username && (
									<p className="text-sm text-red-500 mt-1">
										{errors.username.message}
									</p>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									type="email"
									placeholder="Add your email address"
								/>
								{errors.email && (
									<p className="text-sm text-red-500 mt-1">
										{errors.email.message}
									</p>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Password must be at least 8 characters",
										},
									})}
									type="password"
								/>
								{errors.password && (
									<p className="text-sm text-red-500 mt-1">
										{errors.password.message}
									</p>
								)}
							</Field>

							<Field>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full"
								>
									{isSubmitting ? "Creating Account..." : "Create Account"}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			{message && (
				<div
					className={cn(
						"p-4 rounded-md text-sm",
						message.type === "success"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					)}
				>
					{message.text}
				</div>
			)}
		</div>
	);
}
