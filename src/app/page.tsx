import { ChatInterface } from '@/components/chat-interface';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh bg-background">
      <header className="py-12 sm:py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground tracking-tight">
            Transforme sua cozinha em um
            <br />
            restaurante sem limites:{' '}
            <span className="text-green-600">8.000 receitas</span>
            <br />+ a única <span className="text-blue-500">IA</span> que
            cria qualquer prato
            <br />
            que você imaginar{' '}
            <span className="text-primary">em segundos.</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Enquanto milhões ainda sofrem pensando no que cozinhar, você terá{' '}
            <span className="text-green-600 font-semibold">
              variedade infinita
            </span>
            ,{' '}
            <span className="text-primary font-semibold">
              sabor garantido
            </span>{' '}
            e o poder de decidir cada refeição – com{' '}
            <span className="text-blue-500 font-semibold">um clique</span>.
          </p>
          <div className="mt-8">
            <Button size="lg" className="text-lg">
              Quero provar essa variedade
            </Button>
          </div>
        </div>
      </header>
      <main className="w-full max-w-3xl flex-1 flex flex-col mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ChatInterface />
      </main>
      <footer className="text-center text-muted-foreground text-sm py-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
