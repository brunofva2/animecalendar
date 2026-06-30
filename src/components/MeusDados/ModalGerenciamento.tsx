'use client'

import React from 'react'
import Image from 'next/image'
import { X, Trash2, Calendar } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useAcompanhamento } from '@/context/AcompanhamentoContext'

interface ModalGerenciamentoProps {
  isOpen: boolean
  onClose: () => void
}

export function ModalGerenciamento({
  isOpen,
  onClose,
}: ModalGerenciamentoProps) {
  const { favoritos, removerAnime } = useAcompanhamento()
  const { data: session } = useSession()

  if (!isOpen) return null

  const ordemDias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const nomesCompletos: Record<string, string> = {
    Seg: 'Segunda-feira',
    Ter: 'Terça-feira',
    Qua: 'Quarta-feira',
    Qui: 'Quinta-feira',
    Sex: 'Sexta-feira',
    Sáb: 'Sábado',
    Dom: 'Domingo',
  }

  const handleRemover = (animeId: number) => {
    removerAnime(animeId)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl h-[80vh] flex flex-col bg-[#111113] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#161619]">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <h3 className="text-lg font-bold text-zinc-100">
              Gerenciar Meu Acompanhamento
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {favoritos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-center py-12">
              <Calendar className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm font-medium">
                Nenhum anime adicionado aos favoritos ainda.
              </p>
            </div>
          ) : (
            ordemDias.map(dia => {
              const animesDoDia = favoritos.filter(
                anime => anime.diaLancamento === dia,
              )
              if (animesDoDia.length === 0) return null

              return (
                <div
                  key={dia}
                  className="bg-[#161619]/50 p-4 rounded-xl border border-white/5"
                >
                  <div className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">
                    {nomesCompletos[dia]}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {animesDoDia.map(anime => (
                      <div
                        key={anime.id}
                        className="flex items-center gap-3 bg-[#161619] p-2 rounded-lg border border-white/5 group"
                      >
                        <div className="relative w-10 h-14 rounded overflow-hidden flex-shrink-0 bg-zinc-900">
                          <Image
                            src={anime.image}
                            alt={anime.title}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                            {anime.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {anime.studio}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemover(anime.id)}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
