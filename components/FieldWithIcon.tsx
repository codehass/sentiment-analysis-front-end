import { RegisterOptions, UseFormRegister, Path } from "react-hook-form";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FieldWithIconProps<T extends Record<string, any>> {
	id: keyof T;
	label: string;
	placeholder: string;
	type?: string;
	icon: React.ElementType;
	register: UseFormRegister<T>;
	rules?: RegisterOptions<T, Path<T>>;
	error?: string;
}

export function FieldWithIcon<T extends Record<string, unknown>>({
	id,
	label,
	placeholder,
	type = "text",
	icon: Icon,
	register,
	rules,
	error,
}: FieldWithIconProps<T>) {
	return (
		<Field>
			<FieldLabel htmlFor={String(id)} className="font-medium text-gray-700">
				{label}
			</FieldLabel>
			<div className="relative">
				<Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				<Input
					id={String(id)}
					type={type}
					placeholder={placeholder}
					className={cn(
						"pl-10 pr-4 h-11 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors",
						error && "border-red-500 focus:border-red-500 focus:ring-red-500"
					)}
					{...register(id as Path<T>, rules)}
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
}
