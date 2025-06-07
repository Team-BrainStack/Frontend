"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, LogIn } from "lucide-react";
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
>>>>>>> 912293569f050667b3eebaeed63b3404fe683fd9
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
      console.log("Attempting login with:", { email: loginData.email });
      
      const response = await betterAuthClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
      });

      console.log("Full login response:", JSON.stringify(response, null, 2));

      // Check if login was successful
      if (response?.data?.user) {
        console.log("Login successful, redirecting to dashboard");
        router.push("/dashboard");
        return;
      }

      // Handle error cases
      if (response?.error) {
        console.log("Response error details:", response.error);
        
        const errorMessage = response.error.message || "";
        const errorCode = response.error.code || "";
        
        console.log("Error message:", errorMessage);
        console.log("Error code:", errorCode);
        
        // Check for user not found scenarios
        if (errorMessage.toLowerCase().includes("user not found") || 
            errorMessage.toLowerCase().includes("not found") || 
            errorMessage.toLowerCase().includes("no user") ||
            errorMessage.toLowerCase().includes("does not exist") ||
            errorCode === "USER_NOT_FOUND" ||
            errorCode === "INVALID_EMAIL") {
          setError("Account does not exist. Please sign up first.");
        } else if (errorMessage.toLowerCase().includes("invalid") && 
                   errorMessage.toLowerCase().includes("password")) {
          setError("Invalid password. Please try again.");
        } else if (errorMessage.toLowerCase().includes("email") && 
                   errorMessage.toLowerCase().includes("verified")) {
          setError("Please verify your email address before logging in.");
        } else {
          // Default to account doesn't exist for authentication failures
          setError("Account does not exist. Please sign up first.");
        }
      } else {
        // No user data and no explicit error - likely account doesn't exist
        console.log("No user data and no error - assuming account doesn't exist");
        setError("Account does not exist. Please sign up first.");
      }

    } catch (err: unknown) {
      console.error("Login error caught:", err);
      console.error("Error type:", typeof err);
      
      // Type guard to check if err is an Error object
      if (err instanceof Error) {
        console.error("Error constructor:", err.constructor.name);
        console.error("Error message:", err.message);
      }
      
      // Type guard to check if err has response property (HTTP error)
      if (err && typeof err === 'object' && 'response' in err) {
        const httpError = err as { response: { status?: number; statusCode?: number } };
        console.log("HTTP Response error:", httpError.response);
        const status = httpError.response.status || httpError.response.statusCode;
        
        if (status === 404) {
          setError("Account does not exist. Please sign up first.");
        } else if (status === 401) {
          setError("Account does not exist. Please sign up first.");
        } else if (status && status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Account does not exist. Please sign up first.");
        }
      } else if (err instanceof TypeError && err.message.includes('fetch')) {
        setError("Network error. Please check your connection and try again.");
      } else if (err instanceof Error && err.message.includes('JSON')) {
        setError("Server error. Please try again later.");
      } else if (err instanceof Error) {
        console.log("Error with message:", err.message);
        const errorMsg = err.message.toLowerCase();
        
        if (errorMsg.includes('user not found') || 
            errorMsg.includes('not found') || 
            errorMsg.includes('does not exist') ||
            errorMsg.includes('invalid email')) {
          setError("Account does not exist. Please sign up first.");
        } else {
          setError("Account does not exist. Please sign up first.");
        }
      } else {
        // Empty error object or unknown error
        console.log("Unknown error or empty error object");
        setError("Account does not exist. Please sign up first.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
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
=======
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
                  <LogIn className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Sign In
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {error && (
                <Alert className="border-red-400/30 bg-red-500/10 backdrop-blur-sm">
                  <AlertDescription className="text-red-300 text-sm">
                    {error}
                    {error.includes("Account does not exist") && (
                      <span className="block mt-2">
                        <Link 
                          href="/sign-up" 
                          className="text-blue-400 hover:text-cyan-400 font-medium transition-colors duration-300 hover:underline"
                        >
                          Create an account here →
                        </Link>
                      </span>
                    )}
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
                      value={loginData.email}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
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
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleChange}
                      className="pl-10 bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus:bg-black/30 transition-all duration-300 autofill:bg-black/20 autofill:text-white"
                      style={{
                        WebkitBoxShadow: '0 0 0 30px rgba(0, 0, 0, 0.2) inset',
                        WebkitTextFillColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
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
                <p className="text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/sign-up" 
                    className="text-blue-400 hover:text-cyan-400 font-medium transition-colors duration-300 hover:underline"
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
>>>>>>> 912293569f050667b3eebaeed63b3404fe683fd9
      </div>
    </>
  );
};

export default LoginPage;
