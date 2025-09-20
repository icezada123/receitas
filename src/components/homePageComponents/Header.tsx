'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export function Header({ scrollToMainCta }: { scrollToMainCta: () => void }) {
  const router = useRouter();
  return(

  <header className="py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 ">
    <div className="container  mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground tracking-tight leading-snug sm:leading-normal md:leading-relaxed">
        Transforme sua cozinha em um
        <br className="hidden sm:block" />
        restaurante sem limites:{" "}
        <span className="text-green-600">8.000 receitas</span>
        <br className="hidden sm:block" />+ a única{" "}
        <span className="text-blue-500">IA</span> que cria qualquer prato
        <br className="hidden sm:block" />
        que você imaginar <span className="text-primary">em segundos.</span>
      </h1>
      <p className="mt-4 text-white sm:mt-6 max-w-full sm:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed sm:leading-loose">
        Enquanto milhões ainda sofrem pensando no que cozinhar, você terá{" "}
        <span className="text-green-600 font-semibold">variedade infinita</span>
        , <span className="text-primary font-semibold">sabor garantido</span> e
        o poder de decidir cada refeição – com{" "}
        <span className="text-blue-500 font-semibold">um clique</span>.
      </p>
      <div className="flex justify-center items-center gap-5 mt-6 sm:mt-8">
        <Button
          size="lg"
          className="text-lg h-14 px-10 font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          onClick={scrollToMainCta}
        >
          Quero provar essa variedade
        </Button>
        <Button
          size="lg"
          className="text-lg h-14 px-10 font-bold bg-transparent border border-orange-500 hover:bg-orange-500 duration-700 text-white rounded-lg"
          onClick={() => router.push("/login")}
        >
          Quero Logar na minha Conta
        </Button>
      </div>
    </div>
  </header>
  )
}
