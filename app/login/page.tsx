import { LoginForm } from "@/components/login-form";

export default function SignupPage() {
	return (
		<div className=" flex min-h-screen flex-col items-center justify-center ">
			<div className="flex w-full flex-col">
				<LoginForm />
			</div>
		</div>
	);
}
