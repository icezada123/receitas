'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, preencha seu e-mail e senha.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        setError(response.statusText);
        return;
      }
      const responseData = await response.json();
      setCookie(null, "token", responseData.data.token, {
        maxAge: 15 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/chat");
    } catch (error) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-transparent  rounded-2xl ">
        <h1 className="text-3xl font-bold text-white font-['Montserrat'] mb-6">Logar</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-white">E-mail:</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@email.com"
              value={email}
              className="border font-['Montserrat'] border-gray-700 rounded-xl bg-gray-700 text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white">Senha:</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              className="border font-['Montserrat'] border-gray-700 rounded-xl bg-gray-700 text-white"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button
            className="bg-green-600 font-['Montserrat'] text-md hover:bg-green-700 text-white rounded-xl py-2 mt-2"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
