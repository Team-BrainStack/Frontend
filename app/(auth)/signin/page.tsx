"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import betterAuthClient from "@/lib/integrations/better-auth";


const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await betterAuthClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
      });

      if ("data" in response && response.data?.user) {
        router.push("/feed");
      } else {
        const msg = response.error?.message?.toLowerCase();
        if (msg?.includes("invalid password")) {
          setError("Incorrect password.");
        } else if (msg?.includes("user not found")) {
          setError("User not found. Please sign up.");
        } else {
          setError("Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Add style to fix autofill background color issue */}
      <style jsx global>{`
        /* Override browser autofill styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #1f2937 inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: white;
        }
      `}</style>
      
      <div className="w-full max-w-md backdrop-blur-sm bg-gray-900/70 p-8 rounded-2xl border border-gray-700 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">
          Sign In
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 shadow-lg transition-all duration-200 hover:scale-105"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center mt-4 text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-orange-400 underline hover:text-orange-300 transition-colors"
            >
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
