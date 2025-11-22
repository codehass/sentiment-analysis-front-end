"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowRight,
	Zap,
	Shield,
	Sparkles,
	TrendingUp,
	Star,
	Quote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- Utility Feature Data ---
const features = [
	{
		icon: Zap,
		title: "Instant Prediction",
		description:
			"Get lightning-fast, AI-powered sentiment results in milliseconds.",
		color: "text-blue-600",
	},
	{
		icon: TrendingUp,
		title: "High Accuracy",
		description:
			"Built on a robust machine learning model for reliable classification.",
		color: "text-green-600",
	},
	{
		icon: Shield,
		title: "Data Security",
		description:
			"Your text inputs and personal credentials remain private and secure.",
		color: "text-purple-600",
	},
];

const steps = [
	"Sign up to create your free account.",
	"Log in to access your personal dashboard.",
	"Navigate to the 'Analyze' section.",
	"Paste or type the text you wish to analyze.",
	"Get an instant score and classification (Positive/Negative/Neutral).",
];

const testimonials = [
	{
		quote:
			"This tool cut my feedback analysis time by 70%. Incredibly fast and surprisingly accurate!",
		name: "Sarah K.",
		title: "Marketing Manager",
	},
	{
		quote:
			"The interface is so clean. It's the best sentiment tool I've used for quick content checks.",
		name: "Mark T.",
		title: "Content Creator",
	},
];

export default function HomePage() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* 1. HERO SECTION */}
			<section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40 bg-white">
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-50/50 mask-[radial-gradient(ellipse_at_top,transparent_20%,#000)] pointer-events-none"></div>

				<div className="px-6 max-w-6xl mx-auto text-center relative z-10">
					<p className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mb-4 animate-fadeInDown">
						<Sparkles className="h-4 w-4 mr-1" /> AI-Powered Text Analysis
					</p>

					<h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
						Understand the{" "}
						<span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
							Emotion
						</span>{" "}
						in Any Text.
					</h1>

					<p className="text-gray-600 text-xl mt-6 max-w-3xl mx-auto">
						Our powerful model instantly classifies text, helping you gauge
						customer feedback, social media tone, or any written communication
						with precision.
					</p>

					<Link href="/sentiment">
						<Button className="mt-10 bg-blue-600 hover:bg-blue-700 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
							Start Analyzing Now <ArrowRight className="ml-3 h-5 w-5" />
						</Button>
					</Link>

					<div className="mt-16 relative">
						{/* Mockup/Visual Element */}
						<div className="w-full h-80 bg-gray-100 rounded-xl shadow-2xl border-4 border-blue-200 overflow-hidden flex items-center justify-center">
							<span className="text-blue-500 text-xl font-medium">
								[Insert Screenshot/Mockup of Sentiment Tool Here]
							</span>
						</div>
					</div>
				</div>
			</section>
			{/* 2. FEATURES SECTION */}
			<section className="px-6 py-20 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
						Why Choose Our Analyzer?
					</h2>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="p-6 text-center shadow-lg border-gray-100 hover:shadow-xl transition-shadow duration-300"
							>
								<CardHeader className="flex items-center justify-center p-0 mb-4">
									<div
										className={`p-3 rounded-full ${feature.color} bg-opacity-10`}
									>
										<feature.icon className={`h-8 w-8 ${feature.color}`} />
									</div>
								</CardHeader>
								<CardTitle className="font-semibold text-xl text-gray-900">
									{feature.title}
								</CardTitle>
								<CardContent className="p-0 mt-3 text-base text-gray-500">
									{feature.description}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			---
			{/* 4. SOCIAL PROOF / TESTIMONIALS (NEW SECTION) */}
			<section className="px-6 py-20 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
						Trusted by Innovators
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="p-8 shadow-2xl border-none bg-blue-50"
							>
								<Quote className="h-6 w-6 text-blue-400 mb-4" />
								<p className="text-lg italic text-gray-700">
									"{testimonial.quote}"
								</p>
								<div className="flex mt-6 items-center">
									{/* Avatar Placeholder */}
									<div className="h-10 w-10 bg-blue-200 rounded-full mr-4 flex-shrink-0"></div>
									<div>
										<p className="font-semibold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-blue-600">{testimonial.title}</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>
			---
			{/* 3. HOW IT WORKS */}
			<section className="px-6 py-20 bg-gray-50 border-t border-gray-100">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-14">
						Get Started in 5 Simple Steps
					</h2>

					<ol className="relative space-y-12 max-w-3xl mx-auto">
						{steps.map((step, index) => (
							<li key={index} className="flex items-start">
								{/* Step Circle & Line */}
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md mr-6 relative">
									{index + 1}
									{index < steps.length - 1 && (
										<div className="absolute left-1/2 top-full h-12 w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
									)}
								</div>

								{/* Step Content */}
								<div>
									<h3 className="text-xl font-semibold text-gray-800">
										Step {index + 1}
									</h3>
									<p className="mt-1 text-gray-600 text-lg">{step}</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</section>
			---
			{/* 5. FINAL CALL TO ACTION (NEW SECTION) */}
			<section className="px-6 py-20 bg-blue-600 text-white shadow-inner">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl font-extrabold mb-4">
						Ready to See Your Text's True Tone?
					</h2>
					<p className="text-xl opacity-90 mb-8">
						Unlock deeper insights with our high-accuracy AI model today. No
						credit card needed to start!
					</p>
					<Link href="/register">
						<Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold shadow-2xl transition-all duration-300">
							Create Account & Analyze Free
							<ArrowRight className="ml-3 h-5 w-5" />
						</Button>
					</Link>
				</div>
			</section>
			---
			{/* FOOTER */}
			<footer className="text-center py-8 bg-gray-50 border-t border-gray-200">
				<div className="text-sm text-gray-500">
					<p>© {currentYear} Sentiment Analyzer. All rights reserved.</p>
					<p className="mt-1">
						<Link href="#" className="hover:text-blue-600 transition-colors">
							Privacy Policy
						</Link>
						{" | "}
						<Link
							href="/terms"
							className="hover:text-blue-600 transition-colors"
						>
							Terms of Service
						</Link>
					</p>
				</div>
			</footer>
		</div>
	);
}
