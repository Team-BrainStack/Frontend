"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "@/lib/environment";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Memory {
  id: string;
  title: string | null;
  content: string;
  tags?: string[];
  user: { username: string };
  createdAt: string;
}

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [results, setResults] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedMemory, setExpandedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    axios
      .get<{ data: Memory[] }>(`${serverUrl}/memories/search`, {
        params: { q: query },
        withCredentials: true,
      })
      .then((res) => {
        setResults(res.data.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError(err.response?.data?.error || "Search failed");
        toast.error("Search error");
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="p-6 relative z-10">
        <h1 className="text-xl font-semibold mb-4 text-white">
          Search results for “{query}”
        </h1>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg bg-white/20" />
            ))}
          </div>
        )}

        {!loading && error && <p className="text-red-400">Error: {error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className="text-gray-300">Your vault has no trace of “{query}” yet!</p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            results.map((memory) => {
              const words = memory.content.split(" ");
              const isLong = words.length > 15;
              const preview = isLong ? words.slice(0, 15).join(" ") + "…" : memory.content;

              return (
                <Card
                  key={memory.id}
                  className="bg-black/20 border border-white/10 backdrop-blur-xl text-white shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25"
                >
                  <CardContent className="p-4">
                    <h2 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                      {memory.title || "Untitled Memory"}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {preview}
                      {isLong && (
                        <button
                          className="ml-2 text-blue-400 hover:underline"
                          onClick={() => setExpandedMemory(memory)}
                        >
                          Show more
                        </button>
                      )}
                    </p>
                    {memory.tags && memory.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {memory.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-1 text-xs text-gray-400">
                      {new Date(memory.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Expanded Memory Modal */}
      {expandedMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-2xl bg-black text-white border border-white/10 p-6 shadow-lg relative">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                {expandedMemory.title || "Untitled Memory"}
              </h2>
              <p className="text-sm text-gray-200 whitespace-pre-wrap">{expandedMemory.content}</p>
              {expandedMemory.tags && expandedMemory.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {expandedMemory.tags.map((tag, i) => (
                    <span key={i} className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 text-xs text-gray-400">
                {new Date(expandedMemory.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
                  onClick={() => setExpandedMemory(null)}
                >
                  Show less
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
