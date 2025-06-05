"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, LogIn } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-blue-800 bg-blue-900/30 backdrop-blur-md shadow-2xl rounded-2xl text-white">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
                <LogIn className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-300">
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {[
                { label: "Email", id: "email", type: "email", icon: Mail },
                { label: "Password", id: "password", type: "password", icon: Lock },
              ].map(({ label, id, type, icon: Icon }) => (
                <div className="space-y-2" key={id}>
                  <Label htmlFor={id} className="text-slate-200 text-sm font-medium">
                    {label}
                  </Label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      value={loginData[id as keyof typeof loginData]}
                      onChange={handleChange}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-400">
                Don’t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
