"use client";

import { processUserMessage } from "@/app/actions";
import { ArrowLeft, Send, LoaderCircle, ChefHat, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { RecipeCard } from "../recipe-card";

type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  recipe?: any;
};

export function ChatSection() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Olá! Sou seu chef pessoal de IA. O que você gostaria de cozinhar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsPending(true);

    try {
      const result = await processUserMessage([...messages, userMessage]);

      let aiMessage: Message;

      if (result.recipe && result.recipe.recipeName) {
        aiMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          recipe: result.recipe,
        };
      } else {
        aiMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.response ?? "Não entendi. Pode repetir?",
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Ocorreu um erro ao buscar a resposta.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        <div className="relative p-6 border-b border-gray-200">
          <div className="absolute top-6 left-6 z-10">
            <ArrowLeft
              onClick={() => router.back()}
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800">IA Receitas</h1>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex gap-3 items-end", {
                "justify-end": m.role === "user",
                "justify-start": m.role === "assistant",
              })}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
              )}

              <div
                className={`p-3 max-w-[85%] rounded-xl text-left break-words whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-800"
                } ${m.recipe ? "p-0" : ""}`}
              >
                {m.recipe ? (
                  <RecipeCard recipe={m.recipe} />
                ) : (
                  <p>{m.content}</p>
                )}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-xl rounded-bl-sm flex items-center">
                <LoaderCircle className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center gap-4">
          <input
            type="text"
            placeholder="Pergunte-me qualquer coisa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-4 bg-gray-100 text-gray-800 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            disabled={isPending}
          />

          <button
            onClick={handleSend}
            disabled={isPending}
            className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 duration-500 transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
