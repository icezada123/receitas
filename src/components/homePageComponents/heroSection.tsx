import { Check, X } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection({ scrollToMainCta }: { scrollToMainCta: () => void }) {
    return (
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
    )
    
}