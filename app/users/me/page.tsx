"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please login.");
            setLoading(false);
            return;
        }

        fetch("/api/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    throw new Error(errorData?.detail || "Failed to fetch user data");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (loading) return <div className="p-8">Loading...</div>;

    if (error) return (
        <div className="p-8 text-red-500">
            <p>Error: {error}</p>
            <Button onClick={() => router.push("/login")} className="mt-4">Go to Login</Button>
        </div>
    );

    return (
        <div className="container mx-auto p-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <strong>Username:</strong> {user?.username}
                    </div>
                    {user?.email && (
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                    )}

                    <Button onClick={handleLogout} variant="destructive" className="w-full mt-6">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}