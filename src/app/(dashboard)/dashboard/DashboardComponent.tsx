'use client';

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardComponent() {
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchToken = async () => {
            const t = await getToken();
            console.log("token", t);
        };
        fetchToken();
    }, [getToken]);
    return (
        <div>DashboardComponent</div>
    )
}