"use client"

//Biblioteca de links
import Link from "next/link";

//Biblioteca de imagens
import Image from "next/image";

//Biblitoeca de gerenciamento de sessão do usuário
import { useSession } from 'next-auth/react'

// Biblioteca de estados de variaveis
import { useState } from 'react'


//Biblioteca de icones
import { LogIn, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {

    // Variavel responsável em armazenar a sessão dousuário
    const { data: session, status } = useSession(); 

    const NavLinks = () => (
        <>

            <Button asChild>
                <Link
                    href="/"  
                >
                    <MessageCircle />
                    Solicitar Suporte Técnico
                </Link>
            </Button>        
        
            <Button asChild>
                <Link
                    href="/dashboard"  
                >               
                    <LogIn />
                    Central de Treinamento
                </Link> 
            </Button>

        </>
    )

    return (

        <header>

            <div className="fixed top-0 right-0 left-0 z-[999] py-6 px-6 border-b bg-gradient-to-t from-gray-700 via-gray-700 to-gray-600 p-8 text-white">

                <div className="container mx-auto flex items-center justify-between max-w-3xl">

                    <Link
                        href="/"
                    >
                        <Image
                            src="/logo.png"
                            alt="Orius Tecnologia"
                            width={180}
                            height={100}
                            priority
                        />
                    </Link>


                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLinks />
                    </nav>


                </div>

            </div>

        </header>

    )
}