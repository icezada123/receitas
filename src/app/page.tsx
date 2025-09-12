import { ChatInterface } from '@/components/chat-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Check, Flame, Hand, Quote, Star, X } from 'lucide-react';

const testimonials = [
  {
    name: 'Juliana P.',
    title: 'estudante universitária',
    quote:
      'Achei que seria complicado... mas em segundos a IA me mostrou receitas incríveis com o que eu já tinha na geladeira. Nunca mais sofri pensando no que cozinhar.',
  },
  {
    name: 'Paulo H.',
    title: 'empresário',
    quote:
      'É como ter um chef particular 24h comigo. Praticidade total, comida variada e sem esforço. Recomendo demais!',
  },
  {
    name: 'Maria S.',
    title: 'mãe e profissional',
    quote: 'Salvou minhas noites! Consigo fazer pratos deliciosos e rápidos para a família toda sem estresse. Meus filhos estão adorando a variedade!',
  }
];

const benefits = [
    {
        title: "+8.000 receitas na sua mão",
        description: "Nunca mais repita prato. Cada refeição vira uma experiência nova, saborosa e prática. Você redescobre o prazer de comer bem todos os dias, sem esforço."
    },
    {
        title: "IA que cria qualquer prato em segundos",
        description: "Acabou a frustração de ficar em frente à geladeira sem ideia do que cozinhar. Com um clique, você transforma ingredientes simples em pratos incríveis – ganhando tempo e tranquilidade."
    },
    {
        title: "Variedade infinita + praticidade total",
        description: "Sua família se surpreende a cada refeição, você economiza no delivery e ainda sente que tem controle da sua saúde, da sua rotina e do seu bolso."
    }
]

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

      <section className="py-12 sm:py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-12">
              Histórias reais de quem já transformou a rotina na cozinha
            </h2>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="flex-grow">
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                          <Quote className="w-8 h-8 text-blue-200 ml-auto" />
                        </div>
                        <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        – {testimonial.name},{' '}
                        <span className="text-green-600 font-normal">
                          {testimonial.title}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
          </Carousel>
          <div className="mt-12 text-center">
            <Button size="lg" className="text-lg bg-orange-500 hover:bg-orange-600 text-white">
              Quero minha praticidade na cozinha
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 flex items-center justify-center gap-2">
                <Flame className="w-8 h-8 text-orange-500" />
                Benefícios transformados em Resultados Reais
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-10">
            {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-green-600">
                        <Check className="w-7 h-7 bg-green-600 text-white rounded p-1"/>
                        {benefit.title}
                    </h3>
                    <div className="flex items-start gap-3 pl-2">
                        <Hand className="w-5 h-5 text-yellow-500 mt-1 shrink-0 -rotate-90"/>
                        <p className="text-lg text-muted-foreground">
                            {benefit.description}
                        </p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="text-center text-muted-foreground text-sm py-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
