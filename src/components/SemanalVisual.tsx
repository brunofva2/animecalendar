'use client'

import { useState, useEffect } from 'react'
import { Star, Plus, Check, Clock } from 'lucide-react'
import Image from 'next/image'
import { Anime } from '../types/anime'
import { useAcompanhamento } from '../context/AcompanhamentoContext'

interface SemanalVisualProps {
  animesIniciais: Anime[]
}

export function SemanalVisual({ animesIniciais }: { animesIniciais: any[] }) {
  const { adicionarAnime, removerAnime, isFavorito } = useAcompanhamento()
  const [mounted, setMounted] = useState(false)
  const [diaDeHojeStr, setDiaDeHojeStr] = useState('')

  const mapeamentoDias: Record<number, string> = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sáb',
  }

  const nomesCompletosDias: Record<string, string> = {
    Seg: 'Segunda-feira',
    Ter: 'Terça-feira',
    Qua: 'Quarta-feira',
    Qui: 'Quinta-feira',
    Sex: 'Sexta-feira',
    Sáb: 'Sábado',
    Dom: 'Domingo',
  }

  useEffect(() => {
    setMounted(true)
    const indexHoje = new Date().getDay()
    setDiaDeHojeStr(mapeamentoDias[indexHoje])
  }, [])

  const animesDeHoje = animesIniciais.filter(
    anime => anime.diaLancamento === diaDeHojeStr,
  )

  // MODIFICADO: Função matemática inteligente para converter JST (UTC+9) para Brasília (UTC-3)
  const converterJstParaStringPtBr = (broadcastTime: string) => {
    if (!broadcastTime || broadcastTime === 'Unknown') return 'Horário s/ def.'

    // Captura o padrão de hora e minuto (Ex: "22:30")
    const match = broadcastTime.match(/^(\d{2}):(\d{2})$/)
    if (!match) return `${broadcastTime} JST`

    const horasJst = parseInt(match[1], 10)
    const minutosStr = match[2]

    // Diferença de fuso: JST para UTC-3 são exatamente -12 horas
    let horasBr = horasJst - 12

    // Tratamento caso a subtração resulte em um horário do dia anterior
    if (horasBr < 0) {
      horasBr += 24
    }

    // Formata com zero à esquerda se necessário (Ex: 9 -> 09)
    const horasStr = horasBr.toString().padStart(2, '0')

    return `${horasStr}:${minutosStr} BRT`
  }

  if (!mounted) return null

  return (
    <div className="py-6 text-white font-sans border-b border-white/5 mb-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 animate-pulse">⚡</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100">
            Lança Hoje
          </h2>
        </div>
        <span className="text-xs md:text-sm font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
          {nomesCompletosDias[diaDeHojeStr] || 'Atualizando...'}
        </span>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animesDeHoje.length > 0 ? (
          animesDeHoje.map(anime => {
            const salvo = isFavorito(anime.id)

            return (
              <div
                key={anime.id}
                className="group flex flex-col w-full max-w-[240px]"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900/40 border border-white/5 group-hover:border-white/10 shadow-xl transition-all duration-300 flex items-center justify-center">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                  <button
                    onClick={() =>
                      salvo ? removerAnime(anime.id) : adicionarAnime(anime)
                    }
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all z-10 ${
                      salvo
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'bg-black/40 backdrop-blur-sm border-white/10 text-white hover:bg-black/60'
                    }`}
                  >
                    {salvo ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>

                  {/* MODIFICADO: Agora passando o horário pela função de conversão PT-BR */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/5 px-1.5 py-0.5 rounded text-[9px] font-medium text-zinc-300">
                    <Clock className="w-2.5 h-2.5 text-purple-400" />
                    <span>
                      {converterJstParaStringPtBr(
                        anime.rawBroadcastTime || anime.broadcast?.time,
                      )}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-bold text-white text-xs sm:text-sm mb-1 leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {anime.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                      <span className="flex items-center gap-0.5 text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {anime.score}
                      </span>
                      <span>•</span>
                      <span>
                        {anime.episodes > 0
                          ? `${anime.episodes} EPS`
                          : 'On-going'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-1 flex-wrap">
                  {anime.genres?.slice(0, 2).map((genre: string) => (
                    <span
                      key={genre}
                      className="text-[9px] font-bold text-zinc-400 bg-[#141417] border border-white/5 px-2 py-0.5 rounded-sm uppercase tracking-wide"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full py-8 text-center text-zinc-500 text-xs md:text-sm bg-[#141417]/20 border border-dashed border-white/5 rounded-xl">
            Nenhum anime em lançamento mapeado para hoje.
          </div>
        )}
      </div>
    </div>
  )
}
