"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import betterAuthClient from "@/lib/integrations/better-auth";
import { serverUrl } from "@/lib/environment";

const CreateMemoryPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user session on mount
  useEffect(() => {
  const fetchSession = async () => {
    try {
      const sessionResponse = await betterAuthClient.getSession();

      if ("data" in sessionResponse && sessionResponse.data?.user?.id) {
        setUserId(sessionResponse.data.user.id);
      } else {
        console.error("No valid user session found");
        router.push("/auth/sign-in");
      }
    } catch (err) {
      console.error("Failed to get session", err);
      router.push("/auth/sign-in");
    }
  };

  fetchSession();
}, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !userId) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        userId,
        title: form.title,
        content: form.content,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      };

      const res = await fetch(`${serverUrl}/memories/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error?.message || "Failed to create memory.");
        return;
      }

      router.push("/dashboard/memories");
    } catch (err: unknown) {
      console.error("Error creating memory:", err);
      
      if (err instanceof Error) {
        setError(err.message || "Unexpected error occurred.");
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message || "Unexpected error occurred.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <PlusCircle className="mx-auto h-6 w-6 text-blue-400" />
            <CardTitle className="text-2xl font-bold text-white">Add New Memory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-400/30 bg-red-500/10">
                <AlertDescription className="text-red-300 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Memory title"
                className="bg-black/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your memory here..."
                className="bg-black/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. travel, family"
                className="bg-black/20 text-white"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white py-2 hover:scale-105 transition-transform"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Memory"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMemoryPage;
