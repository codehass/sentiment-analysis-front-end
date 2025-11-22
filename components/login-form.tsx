"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Data = {
	username: string;
	password: string;
};

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<Data>();
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const router = useRouter();

	const onSubmit: SubmitHandler<Data> = async (data) => {
		setMessage(null);
		const formData = new URLSearchParams();
		formData.append("username", data.username);
		formData.append("password", data.password);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json().catch(() => null);
				throw new Error(error?.detail || error?.message || "Login failed");
			}

			const result = await response.json();
			const token = result.access_token || result.token;

			if (token) {
				localStorage.setItem("token", token);
				setMessage({
					type: "success",
					text: "Login successful! Redirecting...",
				});
				setTimeout(() => router.push("/"), 1200);
			}
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error.message || "Unexpected error",
			});
		}
	};

	return (
		<div
			className={cn(
				"flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 p-4",
				className
			)}
			{...props}
		>
			<Card className="w-full max-w-md shadow-xl border border-slate-200">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-semibold text-slate-800">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-slate-500">
						Login to continue to Sentiment Analyzer
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<FieldGroup className="space-y-4">
							<Field>
								<FieldLabel
									className="font-medium text-slate-700"
									htmlFor="username"
								>
									Username
								</FieldLabel>
								<Input
									id="username"
									{...register("username", { required: true })}
									placeholder="Enter your username"
								/>
							</Field>

							<Field>
								<FieldLabel
									className="font-medium text-slate-700"
									htmlFor="password"
								>
									Password
								</FieldLabel>
								<Input
									id="password"
									type="password"
									{...register("password", { required: true })}
									placeholder="••••••••"
								/>
							</Field>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white"
							>
								{isSubmitting ? "Logging in..." : "Login"}
							</Button>

							<Button
								variant="outline"
								type="button"
								className="w-full border-slate-300"
							>
								Login with Google
							</Button>

							<FieldDescription className="text-center text-sm text-slate-500">
								Don't have an account?{" "}
								<a href="/register" className="text-blue-600 underline">
									Sign up
								</a>
							</FieldDescription>
						</FieldGroup>
					</form>

					{message && (
						<div
							className={cn(
								"mt-4 p-3 rounded-md text-sm",
								message.type === "success"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							)}
						>
							{message.text}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
