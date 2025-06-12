"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Main Content */}
      <div className="z-10 max-w-2xl text-center space-y-6 bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
          Welcome to MemoryVault 👋
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Your AI-powered memory assistant to help you store, search, and relive your most valuable moments.
        </p>

        {/* Animated Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-4">
          <Feature
            direction="left"
            title="🧠 Smart Memory Storage"
            description="Capture thoughts, moments, and ideas — all organized and easily retrievable using AI."
          />
          <Feature
            direction="right"
            title="🔍 Fast Search & Tagging"
            description="Find anything instantly with smart search and auto-tagging support."
          />
          <Feature
            direction="left"
            title="📅 Timeline View"
            description="Relive memories chronologically or browse by tags or keywords from the memories stored in your vault."
          />
          <Feature
            direction="right"
            title="🔐 Private & Secure"
            description="All your memories are securely stored — only you can access them."
          />
        </div>

        <p className="text-xs text-gray-500 pt-4">
          Start saving your memories in the vault — your mind deserves a second brain.
        </p>
      </div>
    </div>
  );
}

function Feature({
  title,
  description,
  direction = "left",
}: {
  title: string;
  description: string;
  direction?: "left" | "right";
}) {
  const xOffset = direction === "left" ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow shadow-blue-500/5"
    >
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}
