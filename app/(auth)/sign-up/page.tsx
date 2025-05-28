"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import betterAuthClient from "@/lib/integrations/better-auth";
import { Button } from "@/components/ui/button";


const SignUpPage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    const { username, email, name, password } = formData;

    if (!username || !email || !name || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error, data: result } = await betterAuthClient.signUp.email(
        { username, email, name, password },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => router.push("/signin"), 2000);
          },
          onError: (ctx) => {
            setIsLoading(false);
            const msg = ctx.error.message?.toLowerCase() || "";
            if (msg.includes("already") || msg.includes("exists") || msg.includes("duplicate")) {
              setError("Account already exists. Please sign in instead.");
            } else {
              setError("Signup failed. Please try again.");
            }
          },
        }
      );

      if (error) {
        const msg = error.message?.toLowerCase() || "";
        if (msg.includes("already") || msg.includes("exists") || msg.includes("duplicate")) {
          setError("Account already exists. Please sign in instead.");
        } else {
          setError("Signup failed. Please try again.");
        }
      } else if (result?.user) {
        setFormData({ username: "", email: "", name: "", password: "" });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!data?.user && (
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
              Sign Up
            </h2>

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
            {success && <p className="text-green-400 mb-4 text-sm">{success}</p>}

            <div className="space-y-4">
              {["email", "name", "username", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ))}

              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              <div className="text-sm text-center mt-4 text-gray-300">
                Already have an account?{" "}
                <Link href="/signin" className="text-orange-400 hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
