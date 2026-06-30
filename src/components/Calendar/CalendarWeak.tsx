'use client'

import { useState, useEffect } from 'react'
import {
  Star,
  Plus,
  Check,
  SlidersHorizontal,
  Eye,
  Heart,
  Clock,
} from 'lucide-react'
import Image from 'next/image'
import { Anime } from '../../types/anime'
import { useAcompanhamento } from '../../context/AcompanhamentoContext'
import { ModalGerenciamento } from '../MeusDados/ModalGerenciamento'
// MODIFICADO: Importação ajustada para ler o seu arquivo Next.Fav
import { ProximoLancamentoFavorito } from './NextFav'

export function CalendarioSemanalVisual({
  animesIniciais,
}: {
  animesIniciais: Anime[]
}) {
  const DIAS_DA_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const { adicionarAnime, removerAnime, isFavorito, favoritos } =
    useAcompanhamento()

  const [filtroModo, setFiltroModo] = useState<'todos' | 'favoritos'>(
    'favoritos',
  )
  const [diaAtivo, setDiaAtivo] = useState('Seg')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mapeamento: Record<number, string> = {
      0: 'Dom',
      1: 'Seg',
      2: 'Ter',
      3: 'Qua',
      4: 'Qui',
      5: 'Sex',
      6: 'Sáb',
    }
    setDiaAtivo(mapeamento[new Date().getDay()] || 'Seg')
  }, [])

  const baseAnimes = filtroModo === 'todos' ? animesIniciais : favoritos
  const animesFiltrados = baseAnimes.filter(
    anime => anime.diaLancamento === diaAtivo,
  )

  const formatarHorarioBr = (rawTime?: string) => {
    if (!rawTime || rawTime === 'Unknown') return null
    const match = rawTime.match(/^(\d{2}):(\d{2})$/)
    if (!match) return null
    let horasBr = parseInt(match[1], 10) - 12
    if (horasBr < 0) horasBr += 24
    return `${horasBr.toString().padStart(2, '0')}:${match[2]}`
  }

  if (!mounted) return null

  return (
    <div className="py-8 text-white font-sans">
      {/* BARRA SUPERIOR CONTROLES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#141417] hover:bg-[#1c1c21] text-zinc-300 hover:text-white px-3 py-2 rounded-lg border border-white/5 text-xs font-bold transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            Gerenciar
          </button>

          <div className="flex bg-[#141417] p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setFiltroModo('favoritos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                filtroModo === 'favoritos'
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Meus Favoritos
            </button>
            <button
              onClick={() => setFiltroModo('todos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                filtroModo === 'todos'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Ver Todos
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 order-1 sm:order-2">
          Meu Calendário Semanal
        </h2>
      </div>

      {/* ABAS */}
      <div className="w-full flex mb-8 bg-[#141417] p-1 rounded-full border border-white/5 items-center justify-between">
        {DIAS_DA_SEMANA.map(dia => (
          <button
            key={dia}
            onClick={() => setDiaAtivo(dia)}
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              diaAtivo === dia
                ? 'bg-[#7b2cbf] text-white shadow-lg'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* CONTEÚDO */}
      {animesFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {animesFiltrados.map(anime => {
            const salvo = isFavorito(anime.id)
            const horarioBr = formatarHorarioBr(anime.rawBroadcastTime)

            return (
              <div
                key={anime.id}
                className="group flex flex-col w-full max-w-[240px]"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900/40 border border-white/5 shadow-xl flex items-center justify-center">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

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

                  {salvo && horarioBr && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-purple-600/90 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-black shadow-lg border border-purple-400/30 animate-pulse">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{horarioBr} BRT</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-bold text-white text-sm mb-1 leading-tight line-clamp-2">
                      {anime.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-0.5 text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {anime.score}
                      </span>
                      <span>
                        {anime.episodes > 0
                          ? `${anime.episodes} EPS`
                          : 'On-going'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-1 flex-wrap">
                  {anime.genres.map(genre => (
                    <span
                      key={genre}
                      className="text-[9px] font-bold text-gray-400 bg-[#141417] border border-white/5 px-2 py-0.5 rounded-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <ProximoLancamentoFavorito
          favoritos={favoritos}
          diaSelecionado={diaAtivo}
        />
      )}

      <ModalGerenciamento
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
