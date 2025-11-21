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
		console.log(data);
		const formData = new URLSearchParams();
		formData.append("username", data.username);
		formData.append("password", data.password);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				const errorMessage =
					errorData?.detail ||
					errorData?.message ||
					`HTTP error! status: ${response.status}`;
				throw new Error(errorMessage);
			}

			const result = await response.json();

			const token = result.access_token || result.token;

			if (token) {
				localStorage.setItem("token", token);
				setMessage({
					type: "success",
					text: "Login successful! Redirecting...",
				});
				setTimeout(() => router.push("/"), 1500);
			} else {
				console.warn("No token found in response:", result);
				setMessage({ type: "success", text: "Login successful!" });
			}
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error.message || "An unexpected error occurred.",
			});
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your username below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="username">username</FieldLabel>
								<Input
									id="username"
									{...register("username", { required: true })}
									placeholder="username"
									type="username"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									{...register("password", { required: true })}
									type="password"
									required
								/>
							</Field>
							<Field>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full"
								>
									{isSubmitting ? "Logging in..." : "Login"}
								</Button>
								<Button variant="outline" type="button" className="w-full">
									Login with Google
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<a href="/register" className="underline">
										Sign up
									</a>
								</FieldDescription>
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
