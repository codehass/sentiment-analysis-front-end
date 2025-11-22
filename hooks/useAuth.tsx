// /hooks/useAuth.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setTimeout(() => setIsAuthenticated(true), 0);
		} else {
			router.push("/login");
		}
	}, [router]);

	if (isAuthenticated === null) {
		return null;
	}

	return isAuthenticated;
};

export default useAuth;
