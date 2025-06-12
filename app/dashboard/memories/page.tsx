"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { serverUrl } from "@/lib/environment";
import betterAuthClient from "@/lib/integrations/better-auth";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconTrash, IconEdit } from "@tabler/icons-react";

type Memory = {
  id: string;
  title: string | null;
  content: string;
  tags: string[];
  createdAt: string;
};

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = betterAuthClient.useSession();

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [expandedMemory, setExpandedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchMemories = async () => {
      try {
        const res = await fetch(`${serverUrl}/memories/user/${session.user.id}`);
        const json = await res.json();
        if (json.success) {
          setMemories(json.data);
        } else {
          toast.error(json.error.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load memories");
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, [session]);

  function openUpdateDialog(memory: Memory) {
    setSelectedMemory(memory);
    setUpdateTitle(memory.title || "");
    setUpdateContent(memory.content);
    setShowUpdateDialog(true);
  }

  async function handleUpdateSubmit() {
    if (!selectedMemory) return;
    try {
      const res = await fetch(`${serverUrl}/memories/${selectedMemory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updateTitle,
          content: updateContent,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setMemories((mems) => mems.map((m) => (m.id === selectedMemory.id ? json.data : m)));
        toast.success("Memory updated successfully");
        setShowUpdateDialog(false);
        setSelectedMemory(null);
      } else {
        toast.error(json.error.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update memory");
    }
  }

  async function handleDelete() {
    if (!selectedMemory) return;
    try {
      const res = await fetch(`${serverUrl}/memories/${selectedMemory.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setMemories((mems) => mems.filter((m) => m.id !== selectedMemory.id));
        toast.success("Memory deleted successfully");
        setShowDeleteConfirm(false);
        setSelectedMemory(null);
      } else {
        toast.error(json.error.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete memory");
    }
  }

  const BackgroundBlobs = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <BackgroundBlobs />
        <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg bg-white/20" />
          ))}
        </div>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <BackgroundBlobs />
        <div className="p-6 text-gray-300 text-center relative z-10">
          No memories yet. Start saving your thoughts!
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <BackgroundBlobs />
      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onEdit={() => openUpdateDialog(memory)}
            onDelete={() => {
              setSelectedMemory(memory);
              setShowDeleteConfirm(true);
            }}
            onExpand={() => setExpandedMemory(memory)}
          />
        ))}
      </div>

      {/* Expanded memory popup */}
      {expandedMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-2xl bg-black text-white border border-white/10 p-6 shadow-lg relative">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                {expandedMemory.title || "Untitled Memory"}
              </h2>
              <p className="text-sm text-gray-200 whitespace-pre-wrap">{expandedMemory.content}</p>
              {expandedMemory.tags.length > 0 && (
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

      {/* Confirm Delete */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-xl bg-black text-white border border-white/10">
          <DialogTitle className="text-2xl font-bold mb-4">Confirm Delete</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-300">
              Are you sure you want to delete this memory? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 pt-2">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" type="submit">
                Delete
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Memory */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="max-w-xl bg-black text-white border border-white/10" autoFocus={false}>
          <DialogTitle className="text-2xl font-bold mb-4">Update Memory</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                placeholder="Enter title"
                className="bg-black border border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                rows={4}
                className="w-full bg-black border border-white/20 text-white rounded-md p-2 resize-none"
                placeholder="Enter content"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10 hover:backdrop-blur-sm" type="submit">
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MemoryCard({
  memory,
  onEdit,
  onDelete,
  onExpand,
}: {
  memory: Memory;
  onEdit: () => void;
  onDelete: () => void;
  onExpand: () => void;
}) {
  const words = memory.content.split(" ");
  const isLong = words.length > 15;
  const preview = isLong ? words.slice(0, 15).join(" ") + "…" : memory.content;

  return (
    <Card className="bg-black/20 border border-white/10 backdrop-blur-xl text-white shadow-2xl shadow-blue-500/10 transition-all duration-300">
      <CardContent className="p-4">
        <h2 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
          {memory.title || "Untitled Memory"}
        </h2>
        <p className="text-gray-300 text-sm">
          {preview}
          {isLong && (
            <button
              className="ml-2 text-blue-400 hover:underline"
              onClick={onExpand}
            >
              Show more
            </button>
          )}
        </p>
        {memory.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {memory.tags.map((tag, idx) => (
              <span key={idx} className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1 text-xs text-gray-400">
          {new Date(memory.createdAt).toLocaleDateString()}
        </div>
        <div className="mt-3 flex gap-4 justify-end text-gray-400">
          <button aria-label="Edit Memory" onClick={onEdit} className="hover:text-blue-400 transition-colors">
            <IconEdit size={20} />
          </button>
          <button aria-label="Delete Memory" onClick={onDelete} className="hover:text-red-500 transition-colors">
            <IconTrash size={20} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
