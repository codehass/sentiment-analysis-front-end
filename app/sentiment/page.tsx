"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Loader2, AlertTriangle, Smile, Frown, Meh } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const getSentimentData = (sentiment: string, score: number) => {
	const resultData = {
		positive: {
			label: "Positive",
			color: "border-green-500 bg-green-500/10 text-green-700",
			icon: Smile,
			description: "The text conveys a high level of positivity.",
		},
		negative: {
			label: "Negative",
			color: "border-red-500 bg-red-500/10 text-red-700",
			icon: Frown,
			description: "The text expresses significant negative sentiment.",
		},
		neutral: {
			label: "Neutral",
			color: "border-gray-500 bg-gray-500/10 text-gray-700",
			icon: Meh,
			description: "The text lacks strong positive or negative emotion.",
		},
	};

	const key = sentiment.toLowerCase() as keyof typeof resultData;
	return resultData[key] || resultData.neutral;
};

export default function SentimentPage() {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<{
		result: string;
		score: number;
	} | null>(null);
	const [error, setError] = useState<string | null>(null);
	const isAuthenticated = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.replace("/");
	};

	const analyze = async () => {
		if (!isAuthenticated) {
			setError("You must be authenticated to analyze text.");
			return;
		}

		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const token = localStorage.getItem("token");

			const res = await fetch(`${BACKEND_URL}/predict`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ text }),
			});

			if (!res.ok) {
				if (res.status === 401) {
					setError("Session expired. Please log in again.");
					handleLogout();
					return;
				}

				const errorData = await res.json();
				throw new Error(
					errorData.message || "Failed to analyze sentiment. Please try again."
				);
			}

			const data = await res.json();
			setResult(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else if (typeof err === "string") {
				setError(err);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	if (isAuthenticated === null) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
				<span className="text-xl text-gray-600">Loading Session...</span>
			</div>
		);
	}

	if (isAuthenticated === false) {
		return null;
	}

	const sentimentData = result
		? getSentimentData(result.result, result.score)
		: null;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<div className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					{/* Header Section (Adjusted to be below the navbar) */}
					<header className="text-center mb-10">
						<h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center space-x-3">
							<Zap className="h-8 w-8 text-blue-600" />
							<span>AI Sentiment Analyzer</span>
						</h1>
						<p className="mt-2 text-lg text-gray-500">
							Instantly evaluate the emotion and tone of your text.
						</p>
					</header>
					{/* Main Card */}
					<Card className="shadow-2xl border-none rounded-xl">
						<CardHeader className="p-6 border-b">
							<CardTitle className="text-xl font-semibold text-gray-800">
								Enter Text to Analyze
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6 space-y-6">
							{/* Input and Button */}
							<div className="relative">
								<Textarea
									className="h-40 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 p-4"
									placeholder="Paste or write your text here (e.g., 'The service was excellent and the staff were very friendly')."
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
								<div className="absolute bottom-2 right-4 text-sm text-gray-400">
									{text.length} characters
								</div>
							</div>

							<Button
								onClick={analyze}
								disabled={!text.trim() || loading}
								className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200"
							>
								{loading ? (
									<div className="flex items-center space-x-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										<span>Analyzing...</span>
									</div>
								) : (
									"Analyze Sentiment"
								)}
							</Button>

							{/* Error Message */}
							{error && (
								<div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center space-x-2">
									<AlertTriangle className="h-5 w-5" />
									<p className="font-medium">{error}</p>
								</div>
							)}

							{/* Result Display */}
							{result && !loading && sentimentData && (
								<div
									className={`p-6 border-2 rounded-xl transition-all duration-500 ease-in-out shadow-lg ${sentimentData.color}`}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<sentimentData.icon className="h-8 w-8 shrink-0" />
											<div>
												<h3 className="text-2xl font-bold capitalize">
													{sentimentData.label} Sentiment
												</h3>
												<p className="text-sm opacity-90">
													{sentimentData.description}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm uppercase font-semibold text-gray-500">
												Confidence Score
											</p>
											<p className="text-3xl font-extrabold">
												{result.score.toFixed(3)}
											</p>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
