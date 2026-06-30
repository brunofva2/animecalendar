'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { AuthCard } from '../../src/components/Auth/AuthCard'
import { LoginForm } from '../../src/components/Auth/LoginForm'
import { RegisterForm } from '../../src/components/Auth/RegisterForm'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0c] font-sans overflow-hidden p-4">
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-900/15 rounded-full blur-[100px]"></div>

      {/* Container Principal */}
      <div className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[580px]">
        {/* Lado Esquerdo: Branding */}
        <div className="w-full md:w-1/2 relative flex flex-col p-8 md:p-12 bg-gradient-to-br from-indigo-600/20 to-transparent order-2 md:order-1">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-8 select-none">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Play fill="white" className="w-4 h-4 ml-0.5 text-white" />
              </div>
              <span className="text-white font-semibold text-xl tracking-tight">
                Ani<span className="text-indigo-400">Track</span>
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-4xl font-medium leading-tight mb-4">
              Siga suas obras
              <br />
              <span className="text-indigo-400">favoritas</span> sem erro.
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">
              Acompanhe os lançamentos semanais, receba notificações e organize
              sua lista de animes em um só lugar.
            </p>
          </div>

          <div className="space-y-4 mt-12">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-zinc-700"></div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-zinc-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-zinc-500"></div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-indigo-500 text-[10px] text-white font-bold">
                +12k
              </div>
            </div>
            <p className="text-xs text-zinc-500 italic">
              Junte-se a mais de 12.000 otakus ativos.
            </p>
          </div>
        </div>

        {/* Lado Direito: Formulários Dinâmicos */}
        <div className="w-full md:w-1/2 bg-[#0f0f13]/80 p-8 md:p-12 flex flex-col justify-center order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/5">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <AuthCard
                key="login"
                title="Bem-vindo de volta"
                subtitle="Acesse sua conta para ver o cronograma."
              >
                <LoginForm onToggleForm={() => setIsLogin(false)} />
              </AuthCard>
            ) : (
              <AuthCard
                key="register"
                title="Comece sua jornada"
                subtitle="Crie sua conta para não perder nenhum episódio."
              >
                <RegisterForm onToggleForm={() => setIsLogin(true)} />
              </AuthCard>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-medium z-10">
        <span>Termos</span>
        <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
        <span>Privacidade</span>
        <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
        <span>Suporte</span>
      </div>
    </div>
  )
}
