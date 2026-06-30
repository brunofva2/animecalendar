'use client'

import React, { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onToggleForm: () => void
}

export function LoginForm({ onToggleForm }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  setIsLoading(true)

  // Modificado: callbackUrl força o NextAuth a jogar o usuário direto para a raiz após o sucesso
  const result = await signIn('credentials', {
    redirect: true,
    callbackUrl: '/',
    email,
    password,
  })

  if (result?.error) {
    setError('E-mail ou senha inválidos.')
    setIsLoading(false)
  }
}

 const handleVisitorClick = () => {
   // Cria um cookie que dura 1 dia dizendo que o usuário escolheu entrar como visitante
   document.cookie = 'anitrack_visitor=true; path=/; max-age=86400'

   // Redireciona para o calendário de forma limpa
   window.location.href = '/'
 }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}

      <Input
        label="E-mail"
        type="email"
        placeholder="nome@exemplo.com"
        icon={<Mail size={18} />}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <div className="space-y-1">
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-end pt-1">
          <button
            type="button"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>

      <Button type="submit" isLoading={isLoading} className="mt-2">
        Entrar na Conta
      </Button>

      <div className="mt-6 flex items-center space-x-4">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Ou continuar como
        </span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleVisitorClick}
          className="w-full flex items-center justify-center space-x-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl transition-all"
        >
          <User size={18} className="text-slate-400" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium">Visitante</span>
            <span className="text-[10px] text-slate-500 font-normal mt-0.5">
              Acesso limitado sem salvar progresso
            </span>
          </div>
        </button>
      </div>

      <div className="text-center text-xs text-slate-500 mt-6">
        Novo por aqui?{' '}
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-indigo-400 hover:underline transition-colors"
        >
          Crie sua conta agora
        </button>
      </div>
    </form>
  )
}
