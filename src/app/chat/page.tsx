"use client";
import { ChatSection } from "@/components/chatPageComponents/ChatSection";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/actions";

export default function Chat() {
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (!token) {
      router.push("login");
      return;
    }
    const user = getUser(token);
    if (!user) {
      router.push("login");
      return;
    }
  }, []);
  return <ChatSection />;
}
