// store/chat.ts
import { create } from "zustand"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatStore {
  messages: Message[]
  addMessage: (msg: Message) => void
  addAIResponse: (content: string) => void
  clearChat: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  addAIResponse: (content) =>
    set((state) => ({ messages: [...state.messages, { role: "assistant", content }] })),
  clearChat: () => set({ messages: [] }),
}))
