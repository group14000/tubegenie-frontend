"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function TestPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("token", token);
    };
    fetchToken();
  }, [getToken]);

  return <div>TestPage</div>;
}
