"use client";

import { useForm, SubmitHandler } from "react-hook-form";
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

interface Data {
	name: string;
	username: string;
	email: string;
	password: string;
}

export function SignupForm() {
	const { register, handleSubmit } = useForm<Data>();

	const onSubmit: SubmitHandler<Data> = (data) => {
		console.log("FORM DATA:", data);
	};

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
									{...register("name")}
									placeholder="Add your full name"
									required
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="username">Username</FieldLabel>
								<Input
									id="username"
									{...register("username")}
									placeholder="Add your username"
									required
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									{...register("email")}
									type="email"
									placeholder="Add your email address"
									required
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									{...register("password")}
									type="password"
									required
								/>
							</Field>

							<Field>
								<Button type="submit">Create Account</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
