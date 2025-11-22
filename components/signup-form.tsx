"use client";

import {
	useForm,
	RegisterOptions,
	UseFormRegister,
	Path,
	FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
	User,
	Mail,
	Lock,
	AtSign,
	Loader2,
	CheckCircle,
	AlertTriangle,
} from "lucide-react";

interface Data {
	name: string;
	username: string;
	email: string;
	password: string;
}
interface FieldWithIconProps<T extends FieldValues> {
	id: Path<T>;
	label: string;
	placeholder: string;
	type?: string;
	icon: React.ElementType;
	register: UseFormRegister<T>;
	rules?: RegisterOptions<T, Path<T>>;
	error: string | undefined;
}

export const FieldWithIcon = <T extends FieldValues>({
	id,
	label,
	placeholder,
	type = "text",
	icon: Icon,
	register,
	rules,
	error,
}: FieldWithIconProps<T>) => {
	return (
		<Field>
			<FieldLabel htmlFor={id} className="font-medium text-gray-700">
				{label}
			</FieldLabel>
			<div className="relative">
				<Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				<Input
					id={id}
					type={type}
					placeholder={placeholder}
					className={cn(
						"pl-10 pr-4 h-11 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors",
						error && "border-red-500 focus:border-red-500 focus:ring-red-500"
					)}
					{...register(id, rules)}
				/>
			</div>
			{error && (
				<p className="text-sm text-red-600 mt-1 flex items-center space-x-1">
					<AlertTriangle className="h-4 w-4 inline-block shrink-0" />
					<span>{error}</span>
				</p>
			)}
		</Field>
	);
};

const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Data>();

	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	async function onSubmit(data: Data) {
		setMessage(null);

		try {
			const response = await fetch(`${BACKEND_URL}/auth/register`, {
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

				// Removed the commented out setError example for cleaner code
				throw new Error(errorMessage);
			}

			setMessage({
				type: "success",
				text: "Account created successfully! You can now log in.",
			});
			// Optionally redirect here
		} catch (error) {
			setMessage({
				type: "error",
				text:
					error instanceof Error
						? error.message
						: "An unexpected error occurred.",
			});
		}
	}

	return (
		<div
			className={cn("flex items-center justify-center min-h-screen bg-gray-50")}
		>
			<Card className="w-full max-w-lg shadow-2xl border-none rounded-xl">
				<CardHeader className="text-center p-2">
					<User className="h-10 w-10 mx-auto mb-2 text-blue-600" />
					<CardTitle className="text-3xl font-bold text-gray-900">
						Join the Platform
					</CardTitle>
					<CardDescription className="text-gray-500 mt-1">
						Create your account in seconds.
					</CardDescription>
				</CardHeader>

				<CardContent className="p-6 pt-0">
					{/* Global Message/Feedback Box */}
					{message && (
						<div
							className={cn(
								"mb-6 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-300 border",
								message.type === "success"
									? "bg-green-50 border-green-200 text-green-700"
									: "bg-red-50 border-red-200 text-red-700"
							)}
						>
							{message.type === "success" ? (
								<CheckCircle className="h-5 w-5 shrink-0" />
							) : (
								<AlertTriangle className="h-5 w-5 shrink-0" />
							)}
							<p className="text-sm font-medium">{message.text}</p>
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<FieldGroup className="space-y-4">
							{/* Field 1: Full Name (Cleaned up duplicates) */}
							<FieldWithIcon
								id="name"
								label="Full Name"
								placeholder="Your full name"
								icon={User}
								register={register}
								rules={validationRules.name}
								error={errors.name?.message}
							/>

							{/* Field 2: Username */}
							<FieldWithIcon
								id="username"
								label="Username"
								placeholder="Choose a unique username"
								icon={AtSign}
								register={register}
								rules={validationRules.username}
								error={errors.username?.message}
							/>

							{/* Field 3: Email */}
							<FieldWithIcon
								id="email"
								label="Email"
								placeholder="name@example.com"
								type="email"
								icon={Mail}
								register={register}
								rules={validationRules.email}
								error={errors.email?.message}
							/>

							{/* Field 4: Password */}
							<FieldWithIcon
								id="password"
								label="Password"
								placeholder="Minimum 8 characters"
								type="password"
								icon={Lock}
								register={register}
								rules={validationRules.password}
								error={errors.password?.message}
							/>

							{/* Login/Signup Action Button */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full h-11 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4"
							>
								{isSubmitting ? (
									<div className="flex items-center space-x-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										<span>Creating Account...</span>
									</div>
								) : (
									"Create Account"
								)}
							</Button>

							<p className="text-center text-sm text-gray-500 pt-2">
								Already have an account?{" "}
								<a
									href="/login"
									className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
								>
									Log in
								</a>
							</p>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

// Define validation rules once
// Use FieldValues type for better compatibility with RegisterOptions
export const validationRules: Record<
	keyof Data,
	RegisterOptions<Data, keyof Data>
> = {
	name: { required: "Full name is required" },
	username: { required: "Username is required" },
	email: {
		required: "Email is required",
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: "Invalid email address",
		},
	},
	password: {
		required: "Password is required",
		minLength: {
			value: 8,
			message: "Password must be at least 8 characters",
		},
	},
};
