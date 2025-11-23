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
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldWithIcon } from "./signup-form";
import { Lock, AtSign } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type LoginData = {
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
		formState: { errors, isSubmitting },
	} = useForm<LoginData>();
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);
	const isAuthenticated = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		setMessage(null);
		const formData = new URLSearchParams();
		formData.append("username", data.username);
		formData.append("password", data.password);

		try {
			// const response = await fetch(`${BACKEND_URL}/auth/login`, {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json().catch(() => null);
				throw new Error(error?.detail || error?.message || "Login failed");
			}

			if (response.ok) {
				const result = await response.json();
				localStorage.setItem("token", result.access_token);
				router.replace("/sentiment");
			}

			setMessage({
				type: "success",
				text: "Login successful. Redirecting...",
			});
		} catch (error: unknown) {
			setMessage({
				type: "error",
				text: (error as Error).message || "Unexpected error",
			});
		}
	};

	if (isAuthenticated) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-50 to-slate-200 p-4",
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
							<FieldWithIcon<LoginData>
								id="username"
								label="Username"
								placeholder="Choose a unique username"
								icon={AtSign}
								register={register}
								rules={validationRules.username}
								error={errors.username?.message}
							/>

							<FieldWithIcon<LoginData>
								id="password"
								label="Password"
								placeholder="Minimum 8 characters"
								type="password"
								icon={Lock}
								register={register}
								rules={validationRules.password}
								error={errors.password?.message}
							/>

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
								Don&apos;t have an account?{" "}
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

export const validationRules: Record<
	keyof LoginData,
	RegisterOptions<LoginData>
> = {
	username: {
		required: "Username is required",
	},
	password: {
		required: "Password is required",
		minLength: {
			value: 8,
			message: "Password must be at least 8 characters",
		},
	},
};
