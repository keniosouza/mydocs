"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logoFull from '../../../../public/logo-full.png'
import { Login } from "./profile/login";

export function Hero() {

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  })

  return (
    <section>
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">

        
        <main className="flex items-center justify-center gap-4">
          
          <article className="hidden lg:block flex-[2] max-w-2xl space-y-8 flex flex-col justify-center">

            <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl tracking-tight text-center">
              Inovação que nasce com propósito, cresce com excelência.
            </h1>

            <p className="text-base text-justify md:text-lg text-gray-600">
              Temos como propósito agregar valor aos negócios de nossos clientes, por meio da entrega de soluções tecnológicas ágeis, confiáveis e plenamente alinhadas às suas necessidades e estratégias. Comprometemo-nos com a excelência no atendimento, pautados pela ética, inovação e elevados padrões de qualidade, com foco na construção de relacionamentos sólidos e duradouros.
            </p>

          </article>


          <div className="sm:w-full lg:w-80">
            
              <Login />

          </div>


        </main>

      </div>
    </section>
  )
}