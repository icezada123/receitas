import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { BadgeDollarSign, Check, Flame, Hand, Lock, Quote, Star, ThumbsUp, Zap, X } from 'lucide-react';

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

const finalBenefits = [
    "+8.000 receitas deliciosas e naturais",
    "Uma IA exclusiva que cria qualquer prato em segundos",
    "Variedade infinita e praticidade total todos os dias",
    "Controle da sua rotina alimentar sem esforço e sem monotonia",
]

const faqItems = [
    {
        question: "Preciso saber cozinhar para usar a plataforma?",
        answer: "Não! Todas as receitas são pensadas para qualquer nível, desde iniciantes até quem já gosta de cozinhar. A IA ainda adapta os pratos aos ingredientes que você já tem em casa."
    },
    {
        question: "Realmente são mais de 8.000 receitas?",
        answer: "Sim! E não apenas isso: além das 8.000 opções prontas, a IA pode gerar combinações ilimitadas com base no que você digitar — é literalmente variedade infinita no seu prato."
    },
    {
        question: "A IA funciona no celular?",
        answer: "Funciona perfeitamente em qualquer dispositivo: celular, tablet ou computador. Assim você pode acessar suas receitas a qualquer momento, até na cozinha com o celular ao lado."
    },
    {
        question: "Vou perder muito tempo aprendendo a usar?",
        answer: "De jeito nenhum! A interface é tão intuitiva que em menos de 5 minutos você já estará criando suas primeiras receitas. É tudo pensado para ser rápido e prático."
    },
    {
        question: "E se eu não gostar ou não me adaptar?",
        answer: "Risco zero. Você tem 7 dias de garantia incondicional. Se por qualquer motivo não gostar, é só pedir o reembolso e devolvemos 100% do seu dinheiro, sem perguntas."
    },
    {
        question: "Quanto custa manter o acesso?",
        answer: "O acesso à plataforma é garantido com um pagamento único. Sem mensalidades ou taxas escondidas. Você paga uma vez e aproveita para sempre."
    },
    {
        question: "Posso compartilhar com minha família?",
        answer: "Sim! O acesso pode ser compartilhado com todos na sua casa. Queremos que a transformação na cozinha seja um benefício para toda a família."
    }
];

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
      
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto border-2 border-green-500 rounded-lg p-8">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-red-500">A sua transformação começa hoje</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Você pode continuar gastando tempo e dinheiro no delivery, comendo sempre as mesmas coisas e se frustrando na hora de cozinhar...
                </p>
                <div className="mt-6 text-lg flex items-center justify-center gap-2 text-muted-foreground">
                    <ThumbsUp className="w-5 h-5 text-yellow-500" />
                    <p>Ou pode liberar agora o acesso ao maior acervo de receitas inteligentes do Brasil:</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {finalBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-green-500 mt-1 shrink-0 bg-green-100 rounded-full p-1" />
                        <span className="text-lg">{benefit}</span>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center bg-yellow-100/50 p-6 rounded-lg">
                <h3 className="flex items-center justify-center gap-2 text-xl font-bold">
                    <BadgeDollarSign className="w-6 h-6 text-yellow-600"/>
                    Investimento acessível
                </h3>
                <p className="mt-2 text-muted-foreground">Se você fosse contratar um nutricionista ou um personal chef, gastaria milhares de reais.</p>
                <p className="mt-4 text-2xl text-muted-foreground">De <span className="line-through">R$ 29,90</span> por apenas:</p>
                <p className="text-6xl font-bold text-green-600">R$ 1,99</p>
            </div>
            
            <div className="mt-8 text-center">
                <h3 className="flex items-center justify-center gap-2 text-xl font-bold">
                    <Lock className="w-5 h-5 text-gray-500"/>
                    Garantia sem risco
                </h3>
                <p className="mt-2 text-muted-foreground">Experimente por [X dias] sem compromisso. Se não transformar sua rotina, devolvemos 100% do seu dinheiro.</p>
            </div>

            <div className="mt-6 text-center">
                <p className="flex items-center justify-center gap-2 text-orange-500 font-semibold">
                    <Zap className="w-5 h-5"/>
                    Oferta limitada: <span className="font-normal text-muted-foreground">Condição especial por tempo limitado.</span>
                </p>
            </div>

            <div className="mt-8 text-center">
                <Button size="lg" className="text-lg bg-orange-500 hover:bg-orange-600 text-white h-12 px-10">
                    Quero meu acesso agora
                </Button>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
           <p className="text-center mt-8 text-muted-foreground">
              Ainda tem dúvidas? <a href="#" className="text-green-600 font-semibold underline">Clique aqui e fale conosco agora mesmo.</a>
            </p>
        </div>
      </section>

      <footer className="text-center text-muted-foreground text-sm py-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
