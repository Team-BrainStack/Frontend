"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import betterAuthClient from "@/lib/integrations/better-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, User, Lock, UserPlus } from "lucide-react";

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

  if (data?.user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your information to sign up
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

            {success && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-400 text-sm">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {[
                { label: "Email", id: "email", type: "email", icon: Mail },
                { label: "Full Name", id: "name", type: "text", icon: User },
                { label: "Username", id: "username", type: "text", icon: User },
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
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/log-in"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
