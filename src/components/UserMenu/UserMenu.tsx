'use client'


import { ModalGerenciamento } from '../MeusDados/ModalGerenciamento'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  ChevronDown,
  Heart,
  LogOut,
  LogIn,
  User as UserIcon,
} from 'lucide-react'

export function UserMenu() {

  
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(
    session?.user?.image || '/avatars/luffy.png',
  )
  const avatars = [
    '/avatars/luffy.png',
    '/avatars/gojo.png',
    '/avatars/levi.png',
    '/avatars/naruto.png',
  ]

  // 1. ESTADO DE VISITANTE (Não logado)
  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => router.push('/login')}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-indigo-600/10 active:scale-[0.98] text-sm"
      >
        <LogIn size={16} />
        <span className="hidden sm:inline">Salvar Progresso</span>
      </button>
    )
  }
  <ModalGerenciamento
    isOpen={isFavoritesOpen}
    onClose={() => setIsFavoritesOpen(false)}
  />

  // 2. ESTADO LOGADO
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/5 p-1 pr-3 rounded-full border border-white/10 hover:bg-white/10 transition-all shadow-lg"
      >
        <img
          src={selectedAvatar}
          className="w-8 h-8 rounded-full border border-white/20 object-cover"
          alt="Perfil"
        />
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
          <div className="px-3 py-2 text-xs text-slate-400 border-b border-white/5 mb-2 truncate">
            {session?.user?.name || 'Usuário'}
          </div>

          <button
            onClick={() => {
              setIsFavoritesOpen(true)
              setIsOpen(false)
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Heart size={16} />
            <span>Meus Animes</span>
          </button>
          <div className="border-t border-white/5 mt-2 pt-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 px-3 mb-2">
              Escolher avatar
            </p>

            <div className="grid grid-cols-4 gap-2 px-2">
              {avatars.map(avatar => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className="rounded-full overflow-hidden border border-white/10 hover:border-purple-500 transition-all"
                >
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-10 h-10 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sair da conta</span>
          </button>
        </div>
      )}
    </div>
  )
}
