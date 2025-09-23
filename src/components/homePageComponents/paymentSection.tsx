import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  Check,
  Lock,
  ThumbsUp,
  Zap,
  LoaderCircle,
} from "lucide-react";
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
import Image from "next/image";
import {
  checkPaymentStatus,
  createPixPayment,
} from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const finalBenefits = [
  "+8.000 receitas deliciosas e naturais",
  "Uma IA exclusiva que cria qualquer prato em segundos",
  "Variedade infinita e praticidade total todos os dias",
  "Controle da sua rotina alimentar sem esforço e sem monotonia",
];

export function PaymentSection() {
  const router = useRouter();
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
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
    }, 5000);
  };

  const resetDialog = () => {
    setPaymentDialogOpen(false);
    setPaymentData(null);
    setPaymentStatus("idle");
    setIsGenerating(false);
    setSubmissionComplete(false);
    setEmail("");
    setPassword("");
    setName("");
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      alert("Por favor, preencha seu e-mail, senha e nome.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password  }),
        }
      );
      if (!response.ok) {
        setError(response.statusText);
      }
      const responseData = await response.json();
      setCookie(null, "token", responseData.data.token, {
        maxAge: 15 * 24 * 60 * 60,
        path: "/",
      });

      setSubmissionComplete(true);
      router.push("/chat");
    } catch (error) {
      console.error("Erro ao enviar para o servidor:", error);
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
    <section id="main-cta-section" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 backdrop-blur-sm max-w-4xl mx-auto border-2 border-green-500 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              A sua transformação começa hoje
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Você pode continuar gastando tempo e dinheiro no delivery, comendo
              sempre as mesmas coisas e se frustrando na hora de cozinhar...
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
              <span className="text-green-800 font-bold text-lg">
                7 dias sem compromisso
              </span>
              . Se não transformar sua rotina, devolvemos{" "}
              <span className="text-green-800 font-bold text-lg">
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
                          Aguarde um momento enquanto preparamos seu pagamento.
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
                            Assim que efetuar o pagamento você poderá colocar o
                            email ou celular para receber nossa IA junto com
                            nossas 8 mil receitas.
                          </p>
                        </div>
                        <p className="text-xs text-center text-muted-foreground px-4">
                          A PUSHIN PAY atua exclusivamente como processadora de
                          pagamentos e não possui qualquer responsabilidade pela
                          entrega, suporte, conteúdo, qualidade ou cumprimento
                          das obrigações relacionadas aos produtos ou serviços
                          oferecidos pelo vendedor.
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
                        <AlertDialogAction
                          onClick={resetDialog}
                          className="bg-green-500 duration-500 hover:bg-green-600  rounded-xl"
                        >
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
                          Coloque suas informações
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <form
                        onSubmit={handleContactSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome:</Label>
                          <Input
                            id="name"
                            type="name"
                            placeholder="Nome"
                            value={name}
                            className="border border-black rounded-xl"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail:</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@email.com"
                            value={email}
                            className="border border-black rounded-xl"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                         {/* <div className="space-y-2">
                          <Label htmlFor="phone">Celular:</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(xx) xxxxx-xxxx"
                            value={phone}
                            className="border border-black rounded-xl"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          /> 
                        </div> */}
                        <div className="space-y-2">
                          <Label htmlFor="password">Senha:</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="**********"
                            value={password}
                            className="border border-black rounded-xl"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        { error && <p className="text-sm text-red-500">{error}</p> }
                        <AlertDialogFooter>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white duration-700 rounded-xl"
                            type="submit"
                            disabled={isSubmitting}
                          >
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
            <div className="mt-3">
              <a onClick={()=> router.push("/login")} className="cursor-pointer underline text-sm text-orange-500 duration-500 hover:text-orange-800 text-center text-muted-foreground ">
                Entrar com uma conta existente
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
