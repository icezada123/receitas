import { Check, Flame, Hand, Quote, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
const benefits = [
  {
    title: "+8.000 receitas na sua mão",
    description:
      "Nunca mais repita prato. Cada refeição vira uma experiência nova, saborosa e prática. Você redescobre o prazer de comer bem todos os dias, sem esforço.",
  },
  {
    title: "IA que cria qualquer prato em segundos",
    description:
      "Acabou a frustração de ficar em frente à geladeira sem ideia do que cozinhar. Com um clique, você transforma ingredientes simples em pratos incríveis – ganhando tempo e tranquilidade.",
  },
  {
    title: "Variedade infinita + praticidade total",
    description:
      "Sua família se surpreende a cada refeição, você economiza no delivery e ainda sente que tem controle da sua saúde, da sua rotina e do seu bolso.",
  },
];

const testimonials = [
  {
    name: "Juliana P.",
    title: "estudante universitária",
    quote:
      "Achei que seria complicado... mas em segundos a IA me mostrou receitas incríveis com o que eu já tinha na geladeira. Nunca mais sofri pensando no que cozinhar.",
  },
  {
    name: "Paulo H.",
    title: "empresário",
    quote:
      "É como ter um chef particular 24h comigo. Praticidade total, comida variada e sem esforço. Recomendo demais!",
  },
  {
    name: "Maria S.",
    title: "mãe e profissional",
    quote:
      "Salvou minhas noites! Consigo fazer pratos deliciosos e rápidos para a família toda sem estresse. Meus filhos estão adorando a variedade!",
  },
  {
    name: "Carlos F.",
    title: "desenvolvedor de software",
    quote:
      "Uso a IA para planejar minhas refeições da semana. Economizo tempo e dinheiro, e ainda como super bem. É sensacional!",
  },
  {
    name: "Fernanda L.",
    title: "nutricionista",
    quote:
      "Indico para meus pacientes como uma ferramenta para explorar novos sabores e manter uma alimentação saudável sem monotonia. A variedade de receitas é impressionante.",
  },
  {
    name: "Lucas M.",
    title: "jovem profissional",
    quote:
      "Depois de um dia cansativo, eu só queria algo rápido e gostoso. A IA me deu a solução em 5 segundos. Virou meu app de cabeceira!",
  },
  {
    name: "Beatriz C.",
    title: "aposentada",
    quote:
      "Redescobri o prazer de cozinhar. As receitas são fáceis de seguir e sempre dão certo. Minha família está adorando as novidades que sirvo nos almoços de domingo.",
  },
];
export function CarouselSection({scrollToMainCta}: {scrollToMainCta: () => void}) {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-12">
              Histórias reais de quem já transformou a rotina na cozinha
            </h2>
          </div>
          <Carousel
            opts={{
              align: "start",
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
                        – {testimonial.name},{" "}
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
            <Button
              size="lg"
              className="text-lg bg-orange-500 hover:bg-orange-600 text-white"
              onClick={scrollToMainCta}
            >
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
              <div
                key={index}
                className="flex flex-col gap-3 bg-white/65 backdrop-blur-sm p-6 rounded-md"
              >
                <h3 className="flex items-center gap-2 text-xl font-bold text-green-600">
                  <Check className="w-7 h-7 bg-green-600 text-white rounded p-1" />
                  {benefit.title}
                </h3>
                <div className="flex items-start gap-3 pl-2">
                  <Hand className="w-5 h-5 text-yellow-500 mt-1 shrink-0 -rotate-90" />
                  <p className="text-lg text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
