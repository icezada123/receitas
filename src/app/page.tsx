import { ChatInterface } from '@/components/chat-interface';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

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

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              O que realmente está te impedindo de comer bem todos os dias?
            </h2>
          </div>

          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-muted-foreground">
                Delivery cada vez mais caro... e cada vez menos saudável.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-muted-foreground">
                Frustração diária de abrir a geladeira e não saber o que preparar.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-muted-foreground">
                Sempre a mesma comida repetida, sem graça e sem vontade de comer.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-red-500 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm"></span>
                </div>
                <h3 className="text-2xl font-bold text-red-500">Antes</h3>
              </div>
              <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
                <li>Rotina sem graça.</li>
                <li>Tempo perdido.</li>
                <li>Dinheiro indo embora.</li>
                <li>Saúde deixada de lado.</li>
              </ul>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm"></span>
                </div>
                <h3 className="text-2xl font-bold text-green-500">Depois</h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg text-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>+8.000 receitas deliciosas, variadas e <strong>naturais</strong> na sua mão.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>Uma <strong>IA exclusiva</strong> que cria qualquer prato em segundos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>Variedade infinita + <strong>praticidade total</strong>, sem esforço e sem monotonia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>O poder de decidir o que comer todos os dias — em apenas <strong>1 clique</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="text-lg bg-orange-500 hover:bg-orange-600 text-white">
              Quero minha praticidade na cozinha
            </Button>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl flex-1 flex flex-col mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ChatInterface />
      </main>
      <footer className="text-center text-muted-foreground text-sm py-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
