// app/store/chat.ts
import { create } from "zustand";
import { serverUrl } from "@/lib/environment";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (msg: Message) => void;
  sendQuery: (query: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],

  addMessage: (msg: Message) =>
    set((state: ChatState) => ({ messages: [...state.messages, msg] })),

  sendQuery: async (query: string) => {
    get().addMessage({ role: "user", content: query });

    try {
      const res = await fetch(`${serverUrl}/chats/search`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json", // ✅ this is required
        },

  body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(res.statusText);

      const { answer, references }: { answer: string; references: any[] } = await res.json();

      let responseContent = answer;
      if (references?.length) {
        const refsText = references
          .map(
            (m: any) =>
              `— ${m.title ?? "Untitled"}: ${m.content.slice(0, 100)}...`
          )
          .join("\n");
        responseContent += `\n\n**Sources:**\n${refsText}`;
      }

      get().addMessage({ role: "assistant", content: responseContent });
    } catch (err: any) {
      get().addMessage({
        role: "assistant",
        content: `❌ Error: ${err.message}`,
      });
    }
  },
}));
