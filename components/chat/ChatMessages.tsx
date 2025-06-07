// components/chat/ChatMessages.tsx
"use client"

import { useChatStore } from "@/app/store/chat"
import { cn } from "@/lib/utils"

export function ChatMessages() {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className="space-y-4 p-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "p-3 rounded-lg max-w-[85%]",
            msg.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
        </div>
      ))}
    </div>
  )
}
