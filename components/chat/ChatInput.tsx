// components/chat/ChatInput.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/app/store/chat";

export function ChatInput() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const sendQuery = useChatStore((s) => s.sendQuery);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await sendQuery(query);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Ask anything about your memories..."
        disabled={loading}
      />
      <Button onClick={handleSend} disabled={loading || !query.trim()}>
        {loading ? "…" : "Send"}
      </Button>
    </div>
  );
}
