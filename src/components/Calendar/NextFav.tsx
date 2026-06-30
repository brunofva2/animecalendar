'use client'

import React from 'react'
import Image from 'next/image'
import { Heart, CalendarDays } from 'lucide-react'
import { Anime } from '../../types/anime'

interface ProximoLancamentoFavoritoProps {
  favoritos: Anime[]
  diaSelecionado: string
}

export function ProximoLancamentoFavorito({
  favoritos,
  diaSelecionado,
}: ProximoLancamentoFavoritoProps) {
  const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  if (favoritos.length === 0) {
    return (
      <div className="w-full py-14 flex flex-col items-center justify-center text-center bg-[#141417]/20 border border-dashed border-white/5 rounded-xl text-zinc-500 text-sm">
        <Heart className="w-8 h-8 mb-2 opacity-20 text-purple-500" />
        <p>Você não possui nenhum anime adicionado aos seus favoritos.</p>
      </div>
    )
  }

  // CORRIGIDO: Tipagem explícita adicionada no retorno da função para o TS não inferir 'never'
  const encontrarProximaObra = (): {
    proximoAnime: Anime | null
    diasFaltando: number
  } => {
    const idxAlvo = DIAS.indexOf(diaSelecionado)
    let menorDistancia = 8
    let proximoAnime: Anime | null = null

    favoritos.forEach(anime => {
      const idxAnime = DIAS.indexOf(anime.diaLancamento)
      if (idxAnime === -1) return

      let distancia = idxAnime - idxAlvo
      if (distancia <= 0) distancia += 7

      if (distancia < menorDistancia) {
        menorDistancia = distancia
        proximoAnime = anime
      }
    })

    return { proximoAnime, diasFaltando: menorDistancia }
  }

  const { proximoAnime, diasFaltando } = encontrarProximaObra()

  // Se mesmo assim não houver objeto válido, encerra aqui com segurança
  if (!proximoAnime) {
    return (
      <div className="w-full py-12 text-center text-zinc-500 text-sm bg-[#141417]/20 border border-white/5 rounded-xl">
        Nenhum lançamento favoritado agendado.
      </div>
    )
  }

  return (
    <div className="w-full py-12 flex flex-col items-center justify-center bg-[#111113] border border-white/5 rounded-xl px-4 animate-fade-in">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
          <CalendarDays className="w-5 h-5 text-purple-400" />
        </div>

        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">
          Nada para hoje nesta aba
        </p>

        <h4 className="text-sm text-zinc-200 mb-6">
          Sua próxima obra favorita a lançar será:
        </h4>

        <div className="flex items-center gap-4 bg-[#161619] p-3 rounded-xl border border-white/5 w-full text-left">
          <div className="relative w-14 h-20 rounded-md overflow-hidden bg-zinc-900 flex-shrink-0">
            <Image
              src={proximoAnime.image}
              alt={proximoAnime.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">
              {proximoAnime.diaLancamento === 'Sáb' ||
              proximoAnime.diaLancamento === 'Dom'
                ? 'Lança no'
                : 'Lança na'}{' '}
              {proximoAnime.diaLancamento}
            </span>
            <h5 className="text-sm font-bold text-zinc-100 truncate mt-1.5 mb-0.5">
              {proximoAnime.title}
            </h5>
            <p className="text-xs text-zinc-400 truncate">
              {proximoAnime.studio}
            </p>
          </div>
        </div>

        <div className="mt-5 text-xs text-purple-400 bg-purple-500/5 border border-purple-500/10 px-4 py-1.5 rounded-full font-medium">
          Faltam apenas{' '}
          <span className="font-black text-purple-300">
            {diasFaltando} {diasFaltando === 1 ? 'dia' : 'dias'}
          </span>{' '}
          para o episódio!
        </div>
      </div>
    </div>
  )
}
