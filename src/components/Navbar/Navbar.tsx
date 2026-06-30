'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation' // ADICIONADO: useRouter para navegação
import { useSession } from 'next-auth/react' // ADICIONADO: Para checar se está logado
import { Ghost, Search, Bell, LogIn } from 'lucide-react'
import { IconButton } from '@mui/material'
import { NavTabs } from './NavTabs'
import { UserMenu } from '../UserMenu/UserMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession() // Captura o estado do usuário
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0b1329]/80 backdrop-blur-md border-b border-white/10 px-6 select-none transition-all duration-300 ${
        scrolled
          ? 'pt-2 pb-2 gap-2 shadow-lg shadow-black/40'
          : 'pt-4 pb-3 gap-4'
      }`}
    >
      {/* Linha Superior: Logo, Busca e Perfil */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#7b2cbf] font-bold text-xl uppercase tracking-tighter hover:opacity-90 transition-opacity"
        >
          <Ghost
            className={`text-[#7b2cbf] transition-all duration-300 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`}
          />
          <span className="text-white">AniTrack</span>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="w-full max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar animes..."
              className={`w-full bg-[#161b33] text-gray-200 placeholder-gray-500 border border-gray-800 rounded-full pl-10 pr-4 transition-all duration-300 text-white focus:outline-none focus:border-[#7b2cbf]/70 focus:ring-2 focus:ring-[#7b2cbf]/30 ${
                scrolled ? 'py-1 text-xs' : 'py-1.5 text-sm'
              }`}
            />
          </div>
        </div>

        {/* Notificações, Botão de Criar Conta ou Perfil */}
        <div className="flex items-center gap-4">
          <UserMenu />
          <IconButton
            sx={{
              color: '#9ca3af',
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(31, 41, 55, 0.3)',
              },
            }}
            className="p-1"
          >
            <Bell
              className={`transition-all duration-300 ${scrolled ? 'h-4 w-4' : 'h-5 w-5'}`}
            />
          </IconButton>

        
        </div>
      </div>

      {/* Linha Inferior: Abas de navegação */}
      <div
        className={`transition-all duration-300 ${scrolled ? 'opacity-90 scale-95 origin-left' : 'opacity-100'}`}
      >
        <NavTabs />
      </div>
    </nav>
  )
}

// Layout Estrutural que envelopa a aplicação
export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/login') {
    return <div className="min-h-screen bg-[#0a0a0a]">{children}</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="h-44 w-full block clear-both" />

      <main className="flex-1 container mx-auto px-4 py-4">{children}</main>

      <footer className="border-t border-white/5 mt-auto py-8 bg-[#0b1329]/40">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AniTrack. Construído para ser
          incrível.
        </div>
      </footer>
    </div>
  )
}
