"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChatInterface } from "@/components/chat-interface";
import { Header } from "@/components/homePageComponents/Header";
import { HeroSection } from "@/components/homePageComponents/heroSection";
import { CarouselSection } from "@/components/homePageComponents/carouselSection";
import { PaymentSection } from "@/components/homePageComponents/paymentSection";
import { useNavigate } from "react-router-dom";




const faqItems = [
  {
    question: "Preciso saber cozinhar para usar a plataforma?",
    answer:
      "Não! Todas as receitas são pensadas para qualquer nível, desde iniciantes até quem já gosta de cozinhar. A IA ainda adapta os pratos aos ingredientes que você já tem em casa.",
  },
  {
    question: "Realmente são mais de 8.000 receitas?",
    answer:
      "Sim! E não apenas isso: além das 8.000 opções prontas, a IA pode gerar combinações ilimitadas com base no que você digitar — é literalmente variedade infinita no seu prato.",
  },
  {
    question: "A IA funciona no celular?",
    answer:
      "Funciona perfeitamente em qualquer dispositivo: celular, tablet ou computador. Assim você pode acessar suas receitas a qualquer momento, até na cozinha com o celular ao lado.",
  },
  {
    question: "Vou perder muito tempo aprendendo a usar?",
    answer:
      "De jeito nenhum. O sistema foi criado para ser 100% intuitivo: basta digitar o que você quer ou os ingredientes que tem, e a IA cria a receita em segundos.",
  },
  {
    question: "E se eu não gostar ou não me adaptar?",
    answer:
      "Sem problema! Você tem garantia de 7 dias: se não amar a experiência, devolvemos 100% do seu dinheiro, sem perguntas.",
  },
  {
    question: "Quanto custa manter o acesso?",
    answer:
      "Hoje você garante acesso completo por apenas R$ 4,99. Um investimento muito menor que gastar em delivery toda semana.",
  },
  {
    question: "Posso compartilhar com minha família?",
    answer:
      "Sim! O acesso é individual, mas nada impede que toda a sua família aproveite as receitas e viva a transformação junto com você.",
  },
];

const scrollToMainCta = () => {
  const ctaElement = document.getElementById("main-cta-section");
  if (ctaElement) {
    ctaElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

export default function Home() {
  

  return (
    <div className="flex flex-col min-h-svh">
      <div className="absolute blur-sm rounded-3xl top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <img className="w-full" src="/assets/fundopt1.png" alt="" />
      </div>
      <Header scrollToMainCta={scrollToMainCta} />

      <HeroSection scrollToMainCta={scrollToMainCta} />

      <main className="w-full flex-1 flex flex-col mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Teste nossa IA de graça
          </h2>
        </div>
        <div className="max-w-3xl mx-auto w-full h-full ">
          <ChatInterface />
        </div>
      </main>
      <CarouselSection  scrollToMainCta={scrollToMainCta} />

      <PaymentSection />

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

          <p className="text-center mt-8 gap-5 text-muted-foreground">
            Ainda tem dúvidas?
            <a
              href="https://api.whatsapp.com/send/?phone=556282042321"
              target="_blank"
              className="text-green-600 font-semibold underline"
            >
              Clique aqui e fale conosco agora mesmo.
            </a>
          </p>
        </div>
      </section>

      <footer className="text-center text-muted-foreground text-sm py-6">
        Crie receitas personalizadas com o poder da IA.
      </footer>
    </div>
  );
}
