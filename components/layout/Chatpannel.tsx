// components/layout/ChatPanel.tsx
"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { ChatMessages } from "../chat/ChatMessages"
import { ChatInput } from "../chat/ChatInput"

export function ChatPanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 md:relative md:bottom-0 md:right-0">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="md:hidden fixed bottom-4 right-4 z-40 shadow-lg">
            <MessageSquare />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:w-[400px] md:w-[350px]">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-2">💬 AI Assistant</h3>
            <div className="flex-1 overflow-y-auto">
              <ChatMessages />
            </div>
            <ChatInput />
          </div>
        </SheetContent>
      </Sheet>

      {/* Show as panel on desktop */}
      <div className="hidden md:flex md:flex-col h-screen w-[350px] border-l p-3">
        <h3 className="text-lg font-semibold mb-2">💬 AI Assistant</h3>
        <div className="flex-1 overflow-y-auto">
          <ChatMessages />
        </div>
        <ChatInput />
      </div>
    </div>
  )
}