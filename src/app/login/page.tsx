'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha seu e-mail e senha.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorBody = await response.json();
        setError(errorBody.message);
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
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2500); 

      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <>
    <div>
      <ArrowLeft color="white" className="absolute top-5 left-5 cursor-pointer" onClick={() => router.push("/")} />
    </div>
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
            />
          </div>
          {
          error 
          && 
          <p className="text-sm text-red-500 font-['Montserrat'] text-center">{error}</p>
          
          }
          <Button
            className="bg-orange-600 font-['Montserrat'] text-md hover:bg-orange-800 duration-500 text-white rounded-xl py-2 mt-2"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}
