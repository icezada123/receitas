import { ChatInterface } from '@/components/chat-interface';
import { ChefHat } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      <header className="mb-6 flex flex-col sm:flex-row items-center gap-3 text-center">
        <ChefHat className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Receita AI
          </h1>
          <p className="text-muted-foreground">Seu chef pessoal de inteligência artificial</p>
        </div>
      </header>
      <main className="w-full max-w-3xl flex-1 flex flex-col">
        <ChatInterface />
      </main>
      <footer className="text-center text-muted-foreground text-sm mt-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
