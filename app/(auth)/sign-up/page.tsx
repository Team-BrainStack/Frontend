"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import betterAuthClient from "@/lib/integrations/better-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            setTimeout(() => router.push("/log-in"), 2000);
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

  if (data?.user) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0.2) inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        
        input:-webkit-autofill::first-line {
          color: white !important;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Card className="border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl shadow-black/50 relative overflow-hidden">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 pointer-events-none"></div>
            
            <CardHeader className="space-y-1 text-center relative z-10">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 shadow-lg shadow-blue-500/25">
                  <UserPlus className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {error && (
                <Alert className="border-red-400/30 bg-red-500/10 backdrop-blur-sm">
                  <AlertDescription className="text-red-300 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="border-green-400/30 bg-green-500/10 backdrop-blur-sm">
                  <AlertDescription className="text-green-300 text-sm">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 30px rgba(0, 0, 0, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 30px rgba(0, 0, 0, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 30px rgba(0, 0, 0, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 30px rgba(0, 0, 0, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    href="/log-in" 
                    className="text-blue-400 hover:text-cyan-400 font-medium transition-colors duration-300 hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
