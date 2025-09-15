"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChatInterface } from "@/components/chat-interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BadgeDollarSign,
  Check,
  Flame,
  Hand,
  Lock,
  Quote,
  Star,
  ThumbsUp,
  Zap,
  X,
  LoaderCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { createPixPayment, checkPaymentStatus, sendToDiscord } from "./actions";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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

const finalBenefits = [
  "+8.000 receitas deliciosas e naturais",
  "Uma IA exclusiva que cria qualquer prato em segundos",
  "Variedade infinita e praticidade total todos os dias",
  "Controle da sua rotina alimentar sem esforço e sem monotonia",
];

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
  const [paymentData, setPaymentData] = useState<{
    qr_code_base64: string;
    qr_code: string;
    transaction_id: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "paid" | "error" | "idle"
  >("idle");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (paymentStatus === "paid" && pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    if (!paymentDialogOpen) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      resetDialog();
    }
  }, [paymentStatus, paymentDialogOpen]);

  const handlePayment = async () => {
    setIsGenerating(true);
    setPaymentDialogOpen(true);
    setPaymentStatus("pending");
    try {
      const result = await createPixPayment();
      if (result && result.qr_code_base64) {
        setPaymentData(result);
        startPolling(result.transaction_id);
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("error");
    } finally {
      setIsGenerating(false);
    }
  };

  const startPolling = (transactionId: string) => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
    pollingRef.current = setInterval(async () => {
      const status = await checkPaymentStatus(transactionId);
      if (status === "paid") {
        setPaymentStatus("paid");
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  const resetDialog = () => {
    setPaymentDialogOpen(false);
    setPaymentData(null);
    setPaymentStatus("idle");
    setIsGenerating(false);
    setSubmissionComplete(false);
    setEmail("");
    setPhone("");
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      alert("Por favor, preencha seu e-mail e celular.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendToDiscord(`Novo lead! E-mail: ${email}, Celular: ${phone}`);
      setSubmissionComplete(true);
    } catch (error) {
      console.error("Erro ao enviar para o Discord:", error);
      alert("Ocorreu um erro ao enviar seus dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    // Modern approach
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast({ title: "Código PIX copiado!" }))
        .catch((err) => {
          console.error("Falha ao copiar com a API Clipboard: ", err);
          fallbackCopyTextToClipboard(text);
        });
    } else {
      // Fallback for older browsers or insecure contexts
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make the textarea non-editable and invisible
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast({ title: "Código PIX copiado!" });
      } else {
        toast({ variant: "destructive", title: "Falha ao copiar o código." });
      }
    } catch (err) {
      console.error("Falha ao copiar com o método fallback: ", err);
      toast({
        variant: "destructive",
        title: "Seu navegador não suporta a cópia automática.",
      });
    }

    document.body.removeChild(textArea);
  };

  return (
    <div className="flex flex-col min-h-svh">
      <header className="py-12 sm:py-16 lg:py-20 ">
        <div className="container backdrop-blur-sm rounded-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground tracking-tight leading-snug sm:leading-normal md:leading-relaxed">
            Transforme sua cozinha em um
            <br className="hidden sm:block" />
            restaurante sem limites:{" "}
            <span className="text-green-600">8.000 receitas</span>
            <br className="hidden sm:block" />+ a única{" "}
            <span className="text-blue-500">IA</span> que cria qualquer prato
            <br className="hidden sm:block" />
            que você imaginar <span className="text-primary">em segundos.</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-full sm:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed sm:leading-loose">
            Enquanto milhões ainda sofrem pensando no que cozinhar, você terá{" "}
            <span className="text-green-600 font-semibold">
              variedade infinita
            </span>
            ,{" "}
            <span className="text-primary font-semibold">sabor garantido</span>{" "}
            e o poder de decidir cada refeição – com{" "}
            <span className="text-blue-500 font-semibold">um clique</span>.
          </p>
          <div className="mt-6 sm:mt-8">
            <Button
              size="lg"
              className="text-lg h-14 px-10 font-bold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={scrollToMainCta}
            >
              Quero provar essa variedade
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-16 lg:py-20 backdrop-blur-sm ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              O que realmente está te impedindo de comer bem todos os dias?
            </h2>
          </div>

          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-black font-medium">
                Delivery cada vez mais caro... e cada vez menos saudável.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-black font-medium">
                Frustração diária de abrir a geladeira e não saber o que
                preparar.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
              <p className="text-lg text-black font-medium">
                Sempre a mesma comida repetida, sem graça e sem vontade de
                comer.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border-2 border-red-500 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm"></span>
                </div>
                <h3 className="text-2xl font-bold text-red-500">Antes</h3>
              </div>
              <ul className="mt-6 space-y-3 text-lg text-muted-foreground ">
                <li className="flex items-center gap-5">
                  <X className="w-6 h-6 text-red-500 mt-1 shrink-0" /> Rotina
                  sem graça.
                </li>
                <li className="flex items-center gap-5">
                  <X className="w-6 h-6 text-red-500 mt-1 shrink-0" /> Tempo
                  perdido.
                </li>
                <li className="flex items-center gap-5">
                  <X className="w-6 h-6 text-red-500 mt-1 shrink-0" /> Dinheiro
                  indo embora.
                </li>
                <li className="flex items-center gap-5">
                  <X className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                  Saúde deixada de lado.
                </li>
              </ul>
            </div>

            <div className="bg-white/60 backdrop-blur-sm  border-2 border-green-500 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm"></span>
                </div>
                <h3 className="text-2xl font-bold text-green-500">Depois</h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg text-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>
                    +8.000 receitas deliciosas, variadas e{" "}
                    <strong>naturais</strong> na sua mão.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>
                    Uma <strong>IA exclusiva</strong> que cria qualquer prato em
                    segundos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>
                    Variedade infinita + <strong>praticidade total</strong>, sem
                    esforço e sem monotonia.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <span>
                    O poder de decidir o que comer todos os dias — em apenas{" "}
                    <strong>1 clique</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
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

      <section id="main-cta-section" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/50 backdrop-blur-sm max-w-4xl mx-auto border-2 border-green-500 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-red-500">
                A sua transformação começa hoje
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Você pode continuar gastando tempo e dinheiro no delivery,
                comendo sempre as mesmas coisas e se frustrando na hora de
                cozinhar...
              </p>
              <div className="mt-6 text-lg flex items-center justify-center gap-2 text-muted-foreground">
                <ThumbsUp className="w-5 h-5 text-yellow-500" />
                <p>
                  Ou pode liberar agora o acesso ao maior acervo de receitas
                  inteligentes do Brasil:
                </p>
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
                <BadgeDollarSign className="w-6 h-6 text-yellow-600" />
                Investimento acessível
              </h3>
              <p className="mt-2 text-muted-foreground">
                Se você fosse contratar um nutricionista ou um personal chef,
                gastaria milhares de reais.
              </p>
              <p className="mt-4 text-2xl text-muted-foreground">
                De <span className="line-through">R$ 29,90</span> por apenas:
              </p>
              <p className="text-6xl font-bold text-green-600">R$ 4,99</p>
            </div>

            <div className="mt-8 text-center">
              <h3 className="flex items-center justify-center gap-2 text-xl font-bold">
                <Lock className="w-5 h-5 text-gray-500" />
                Garantia sem risco
              </h3>
              <p className="mt-2 text-muted-foreground">
                Experimente por{" "}
                <span className="text-red-500 font-bold text-lg">
                  7 dias sem compromisso
                </span>
                . Se não transformar sua rotina, devolvemos{" "}
                <span className="text-red-500 font-bold text-lg">
                  100% do seu dinheiro
                </span>
                .
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="flex items-center justify-center gap-2 text-orange-500 font-semibold">
                <Zap className="w-5 h-5" />
                Oferta limitada:{" "}
                <span className="font-normal text-muted-foreground">
                  Condição especial por tempo limitado.
                </span>
              </p>
            </div>

            <div id="main-cta" className="mt-8 text-center">
              <AlertDialog
                open={paymentDialogOpen}
                onOpenChange={setPaymentDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="text-lg bg-orange-500 hover:bg-orange-600 text-white h-12 px-10"
                    onClick={handlePayment}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Quero meu acesso agora"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent onEscapeKeyDown={resetDialog}>
                  {paymentStatus === "idle" || paymentStatus === "pending" ? (
                    <>
                      {isGenerating && !paymentData ? (
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Gerando seu acesso...
                          </AlertDialogTitle>
                          <div className="flex justify-center py-4">
                            <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
                          </div>
                          <AlertDialogDescription>
                            Aguarde um momento enquanto preparamos seu
                            pagamento.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                      ) : !paymentData ? (
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Aguardando Pagamento
                          </AlertDialogTitle>
                          <div className="flex justify-center py-4">
                            <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
                          </div>
                          <AlertDialogDescription className="text-center">
                            Continue no app do seu banco. Estamos aguardando a
                            confirmação do pagamento.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                      ) : (
                        <>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Pague com PIX para liberar seu acesso
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Escaneie o QR Code abaixo com o app do seu banco
                              para pagar R$ 4,99 e liberar o acesso.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex flex-col items-center gap-4 py-4">
                            <Image
                              src={paymentData.qr_code_base64}
                              alt="PIX QR Code"
                              width={200}
                              height={200}
                            />
                            <Label htmlFor="pix-code">
                              Ou copie o código PIX:
                            </Label>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                              <Input
                                id="pix-code"
                                readOnly
                                value={paymentData.qr_code}
                              />
                              <Button
                                onClick={() =>
                                  copyToClipboard(paymentData.qr_code)
                                }
                              >
                                Copiar
                              </Button>
                            </div>
                            <p className="text-sm font-semibold text-center mt-2">
                              Assim que efetuar o pagamento você poderá colocar
                              o email ou celular para receber nossa IA junto com
                              nossas 8 mil receitas.
                            </p>
                          </div>
                          <p className="text-xs text-center text-muted-foreground px-4">
                            A PUSHIN PAY atua exclusivamente como processadora
                            de pagamentos e não possui qualquer responsabilidade
                            pela entrega, suporte, conteúdo, qualidade ou
                            cumprimento das obrigações relacionadas aos produtos
                            ou serviços oferecidos pelo vendedor.
                          </p>
                        </>
                      )}
                    </>
                  ) : paymentStatus === "paid" ? (
                    submissionComplete ? (
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Sucesso!</AlertDialogTitle>
                          <AlertDialogDescription>
                            Seu acesso foi enviado. Verifique seu e-mail (e a
                            caixa de spam) para começar a usar.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction onClick={resetDialog}>
                            Fechar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    ) : (
                      <>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Pagamento Confirmado!
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Para onde devemos enviar seu acesso?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <form
                          onSubmit={handleContactSubmit}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Celular</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(11) 99999-9999"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          <AlertDialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <LoaderCircle className="animate-spin" />
                              ) : (
                                "Receber acesso"
                              )}
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </>
                    )
                  ) : (
                    // paymentStatus === 'error'
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Erro no Pagamento</AlertDialogTitle>
                        <AlertDialogDescription>
                          Não foi possível processar seu pagamento. Por favor,
                          tente novamente ou entre em contato com o suporte.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={resetDialog}>
                          Fechar
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </>
                  )}
                  {paymentStatus !== "paid" && (
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={resetDialog}>
                        Cancelar
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  )}
                </AlertDialogContent>
              </AlertDialog>
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
