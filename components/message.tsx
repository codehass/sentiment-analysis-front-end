"use client";

import { useEffect, useState } from "react";

type Data = {
	message: string;
};

export default function Message() {
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch("http://127.0.0.1:8000/");
			const json = await res.json();
			setData(json);
		}
		fetchData();
	}, []);

	console.log(data);

	return (
		<div>
			<h1>Hello from frontend</h1>

			<div>this message from backend: {data ? data.message : "Loading..."}</div>
		</div>
	);
}
