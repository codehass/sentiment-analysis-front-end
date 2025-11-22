import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
	const headersList = await headers();
	const requestedPath = headersList.get("x-invoke-path");
	const referer = headersList.get("referer");

	return (
		<div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
			<h1 className="text-9xl font-extrabold tracking-widest text-blue-600 drop-shadow-lg mb-8">
				404
			</h1>
			<div className="bg-gray-100 px-6 py-4 rounded-lg shadow-2xl text-center border-t-4 border-blue-600">
				<h2 className="text-3xl font-semibold mb-4 text-gray-100">
					Page Not Found
				</h2>
				<p className="text-lg text-black mb-6 max-w-md">
					Oops! It looks like you&apos;ve followed a broken link or entered a
					URL that doesn&apos;t exist here.
				</p>
				{requestedPath && (
					<div className="mb-6 p-3 bg-gray-100 rounded-md text-sm italic text-black-300">
						<p className="font-medium text-blue-400">Path attempted:</p>
						<p className="break-all">{requestedPath}</p>
					</div>
				)}
				<Link
					href="/"
					className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						></path>
					</svg>
					Go Back Home
				</Link>
			</div>
			<p className="mt-8 text-sm text-gray-500">Error code: UFNX-404</p>
		</div>
	);
}
