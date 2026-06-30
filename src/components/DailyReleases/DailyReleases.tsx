'use client'



import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Anime } from '../../types/anime'

interface DailyReleasesProps {
  animes: Anime[]
}

export default function DailyReleases({ animes }: DailyReleasesProps) {
  const lancamentosDestaque = animes.slice(0, 10)

  const renderPlataformaBadge = (plataformas?: string[]) => {
    if (!plataformas || plataformas.length === 0) {
      return (
        <span className="bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
          CRUNCHYROLL
        </span>
      )
    }

    return plataformas.slice(0, 1).map(plat => {
      const p = plat.toLowerCase()

      if (p.includes('crunchyroll')) {
        return (
          <span
            key={plat}
            className="bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm"
          >
            CRUNCHYROLL
          </span>
        )
      }
      if (p.includes('netflix')) {
        return (
          <span
            key={plat}
            className="bg-red-600/20 text-red-400 border border-red-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm"
          >
            NETFLIX
          </span>
        )
      }
      if (p.includes('hulu') || p.includes('disney') || p.includes('star+')) {
        return (
          <span
            key={plat}
            className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm"
          >
            DISNEY+
          </span>
        )
      }
      if (p.includes('prime') || p.includes('amazon')) {
        return (
          <span
            key={plat}
            className="bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm"
          >
            PRIME
          </span>
        )
      }

      return (
        <span
          key={plat}
          className="bg-zinc-700/50 text-zinc-300 border border-zinc-600/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase truncate max-w-[70px]"
        >
          {plat}
        </span>
      )
    })
  }

  return (
    <div className="w-full text-zinc-50 mt-12 font-sans">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-zinc-100">
            Lançamentos da Temporada
          </h2>
          <span className="text-xs text-zinc-400 font-medium">
            {animes.length} animes ativos
          </span>
        </div>
        <Link
          href="/temporadas?ano=2026&temporada=spring"
          className="text-xs font-bold bg-[#7b2cbf] hover:bg-[#62239a] text-white px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider"
        >
          Ver Todos
        </Link>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
        {lancamentosDestaque.map(anime => (
          <div key={anime.id} className="flex flex-col group cursor-pointer">
            {/* Container da Imagem (16:9) */}
            {/* MODIFICADO: Alterado de rounded-xl para rounded-lg para diminuir a borda arredondada */}
            <div className="relative aspect-video w-full bg-zinc-900/40 rounded-lg overflow-hidden border border-white/5 group-hover:border-white/10 shadow-lg transition-all duration-300 flex items-center justify-center">
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Degradê protetor interno */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Tag HD */}
              <span className="absolute top-2 left-2 text-[8px] font-extrabold bg-[#7b2cbf] text-white px-1 py-0.5 rounded shadow">
                HD
              </span>

              {/* Plataformas de Transmissão */}
              <div className="absolute bottom-2 right-2 flex justify-end gap-1">
                {renderPlataformaBadge(anime.streaming)}
              </div>
            </div>

            {/* Informações textuais compactadas abaixo do card */}
            <div className="mt-2 flex flex-col gap-0.5">
              <h3 className="text-xs md:text-sm font-bold text-zinc-100 group-hover:text-[#a855f7] transition-colors line-clamp-1">
                {anime.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                <span className="truncate max-w-[90px]">{anime.studio}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span>
                  {anime.episodes > 0 ? `${anime.episodes} eps` : 'On-going'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
