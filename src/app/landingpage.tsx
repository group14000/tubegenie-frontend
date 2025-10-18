"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton>
          <Button
            variant="ghost"
            className="text-blue-200 hover:text-white hover:bg-blue-900/50 cursor-pointer"
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Button
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 cursor-pointer"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </SignedIn>
    </div>
  );
}
