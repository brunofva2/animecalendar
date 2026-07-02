'use client'

import React from 'react'
import Image from 'next/image'
import { Trash2, Calendar } from 'lucide-react'
// Ajustado para o novo padrão de importação
import { useAcompanhamento } from '@/context/AcompanhamentoContext'

import { BadgeProgressoEp} from '../BadgeProgresso/BadgeProgressoEp'
export function MeuAcompanhamento() {
  const { favoritos, removerAnime } = useAcompanhamento()
  

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

  // Função para lidar com a remoção garantindo o envio do userId
  const handleRemover = (animeId: number) => {
    removerAnime(animeId)
  }

  if (favoritos.length === 0) {
    return (
      <div className="w-full p-8 rounded-2xl bg-[#141417] border border-white/5 text-center text-zinc-500 mt-8">
        <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
        <p className="text-sm font-medium">
          Você ainda não está acompanhando nenhum anime nesta temporada.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full text-zinc-50 mt-12 font-sans">
      <h2 className="text-xl md:text-2xl font-bold tracking-wide text-zinc-100 mb-6 flex items-center gap-2">
        <span className="text-purple-500">⭐</span> Meu Acompanhamento Semanal
      </h2>

      <div className="flex flex-col gap-6">
        {ordemDias.map(dia => {
          const animesDoDia = favoritos.filter(
            anime => anime.diaLancamento === dia,
          )

          if (animesDoDia.length === 0) return null

          return (
            <div
              key={dia}
              className="bg-[#111113] p-4 rounded-xl border border-white/5"
            >
              <div className="text-sm font-extrabold text-purple-400 uppercase tracking-wider mb-3 pb-2 border-b border-white/5">
                {nomesCompletos[dia]}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {animesDoDia.map(anime => (
                  <div
                    key={anime.id}
                    className="flex items-center gap-3 bg-[#161619] p-2 rounded-lg group relative border border-transparent hover:border-white/5"
                  >
                    {anime.status === 'Finished Airing' && (
                      <div className="absolute top-2 left-2 z-10 bg-purple-600/90 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg backdrop-blur-sm text-white pointer-events-none">
                        FINALIZADO
                      </div>
                    )}
                    <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-zinc-900">
                      <Image
                        src={anime.image}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-bold text-zinc-100 truncate group-hover:text-purple-400 transition-colors">
                        {anime.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {anime.studio}
                      </p>
                      <BadgeProgressoEp
                        startDate={anime.startDate}
                        totalEpisodes={anime.episodes}
                      />
                    </div>

                    <button
                      onClick={() => handleRemover(anime.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                      title="Remover do acompanhamento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
