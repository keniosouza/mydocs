// src/app/(panel)/dashboard/_components/sidebar.tsx

"use client"

import { useState, Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react"
import clsx from 'clsx';
import Image from "next/image";
import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

// Componentes UI personalizados
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip"
import {
  Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "@/components/ui/collapsible"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// Ícones
import {
  ChevronLeft, ChevronRight, Edit, Monitor, LogOut, List, ChevronRight as ChevronIcon
} from 'lucide-react';

// Imagens
import logoImg from '/public/logo.png'
import logoImgGray from '/public/logo-text-gray.png'

// Componente principal da sidebar
export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Rota atual
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado do menu recolhido

  // Itens do menu
  const navItems = [
    {
      title: "Administração", icon: <Monitor className='inline' />, data: [
        { href: "/empresas", label: "Empresas" },
        { href: "/usuarios", label: "Usuários" },
        { href: "/produtos", label: "Produtos" },
        { href: "/status", label: "Status" },
        { href: "/configuracoes", label: "Configurações" },
      ]
    },
    {
      title: "Documentos", icon: <Edit className='inline' />, data: [
        { href: "/minutas", label: "Minutas" },
        { href: "/marcacoes", label: "Marcações" },
      ]
    },
  ]

  return (
    <div className='flex min-h-screen w-full'>
      {/* Sidebar lateral */}
      <aside
        className={clsx("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full bg-gradient-to-l from-gray-700 via-gray-700 to-gray-600", {
          "w-20": isCollapsed,
          "w-64": !isCollapsed,
          "hidden md:flex md:fixed": true
        })}
      >
        <div className='mb-6 mt-4'>
          {!isCollapsed && <Image src={logoImg} alt="Orius Tecnologia" priority quality={100} />}
        </div>

        {/* Botão recolher/expandir */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='self-end mb-2 cursor-pointer' onClick={() => setIsCollapsed(!isCollapsed)}>
                {!isCollapsed ? <ChevronLeft className='w-12 h-12' /> : <ChevronRight className='w-12 h-12' />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{!isCollapsed ? "Fechar" : "Abrir"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Navegação lateral (versão recolhida com dropdown) */}
        {isCollapsed && (
          <nav className='flex flex-col gap-1 overflow-hidden mt-2'>
            {navItems.map((grupo, index) => (
              <Fragment key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SidebarLink href="#" label={grupo.title} pathname={pathname} isCollapsed={isCollapsed} icon={grupo.icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='right' className='w-55 bg-gray-200 mt-5'>
                    <DropdownMenuLabel className='text-2xl text-center'>{grupo.title}</DropdownMenuLabel>
                    {grupo.data.map((item, idx) => (
                      <DropdownMenuItem key={item.href || idx} className='bg-white rounded-none border'>
                        <PopupLink href={item.href} label={item.label} pathname={pathname} isCollapsed={isCollapsed} icon={<ChevronIcon className='w-4 h-4 mt-1' />} />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Fragment>
            ))}
          </nav>
        )}

        {/* Navegação lateral expandida com collapsible */}
        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <ScrollArea className="h-40 xl:h-120">
              <nav className='flex flex-col gap-1 overflow-hidden'>
                {navItems.map((grupo, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger>
                      <span className="flex w-55 text-white cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-500 border-b border-gray-500">
                        {grupo.icon}
                        {!isCollapsed && <span>{grupo.title}</span>}
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='bg-gray-700'>
                      {grupo.data.map((item, idx) => (
                        <SidebarLink key={item.href || idx} href={item.href} label={item.label} pathname={pathname} isCollapsed={isCollapsed} icon={<ChevronIcon className='w-4 h-4 mt-1' />} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                {/* Botão de logout */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {!isCollapsed && "Sair"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Sua sessão será encerrada e você será redirecionado para a página de login.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Sair
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </nav>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      {/* Conteúdo principal */}
      <div className={clsx("flex flex-1 flex-col transition-all duration-300 bg-white", {
        "md:ml-20": isCollapsed,
        "md:ml-64": !isCollapsed
      })}>

        {/* Header mobile com menu lateral */}
        <header className='md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0'>
          <Sheet>
            <div className='flex items-center gap-4'>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='md:hidden' onClick={() => setIsCollapsed(false)}>
                  <List className='w-5 h-5' />
                </Button>
              </SheetTrigger>
              <h1 className='text-base md:text-lg font-semibold'>
                <Image src={logoImgGray} alt="Orius Tecnologia" width={120} height={60} priority quality={100} />
              </h1>
            </div>
            <SheetContent side="right" className='sm:max-w-xs text-white p-4 bg-gray-800/60'>
              <SheetTitle>
                <Image src={logoImg} alt="Orius Tecnologia" width={180} height={100} priority />
              </SheetTitle>
              <SheetDescription className='text-white'>Menu administrativo</SheetDescription>
              <ScrollArea className="h-160 xl:h-120">
                <nav className='grid gap-2 text-base pt-5'>
                  {navItems.map((grupo, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger>
                        <span className="flex w-75 text-white cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-500 border-b border-gray-500">
                          {grupo.icon}
                          <span>{grupo.title}</span>
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='bg-gray-700'>
                        {grupo.data.map((item, idx) => (
                          <SidebarLink key={item.href || idx} href={item.href} label={item.label} pathname={pathname} isCollapsed={isCollapsed} icon={<ChevronIcon className='w-4 h-4 mt-1' />} />
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {!isCollapsed && "Sair"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Sua sessão será encerrada e você será redirecionado para a página de login.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Sair
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </header>

        {/* Renderiza conteúdo */}
        <main className='flex-1 py-4 px-2 md:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

// Componente para links laterais
function SidebarLink({ href, icon, isCollapsed, label, pathname, onClick }: SidebarLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} onClick={onClick}>
            <div className={clsx("flex items-center gap-2 px-3 py-2 border-b border-gray-500", {
              "text-white bg-black": pathname === href,
              "text-gray-300 hover:bg-gray-800 hover:text-white": pathname !== href,
            })}>
              <span className='w-6 h-6'>{icon}</span>
              {!isCollapsed && <span>{label}</span>}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Componente para links de popup
function PopupLink({ href, icon, isCollapsed, label, pathname }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className={clsx("flex items-center gap-2 px-2 mb-1 w-55", {
        "text-black": true
      })}>
        <span className='w-6 h-6'>{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  )
}

// Tipagem dos links
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
