'use client'

import { Eye, Heart, SlidersHorizontal } from 'lucide-react'
import { SeasonButton } from './SeasonButton'
import { CompletedBadge } from './CompletedBadge'

interface SeasonNavigationProps {
  filtroModo: 'todos' | 'favoritos'

  currentSeason: string
  previousSeason: string

  completed: number

  viewingPrevious: boolean

  onGerenciar: () => void

  onFiltroFavoritos: () => void
  onFiltroTodos: () => void

  onCurrentSeason: () => void
  onPreviousSeason: () => void
}

export function SeasonNavigation({
  filtroModo,

  currentSeason,
  previousSeason,

  completed,

  viewingPrevious,

  onGerenciar,

  onFiltroFavoritos,
  onFiltroTodos,

  onCurrentSeason,
  onPreviousSeason,
}: SeasonNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Gerenciar */}

      <button
        onClick={onGerenciar}
        className="flex items-center gap-1.5 bg-[#141417] hover:bg-[#1c1c21] text-zinc-300 hover:text-white px-3 py-2 rounded-lg border border-white/5 text-xs font-bold transition-all"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
        Gerenciar
      </button>

      {/* Favoritos / Todos */}

      <div className="flex bg-[#141417] p-1 rounded-lg border border-white/5">

        <button
          onClick={onFiltroFavoritos}
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
          onClick={onFiltroTodos}
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

      {/* Temporada Atual */}

      <SeasonButton
        label={currentSeason}
        active={!viewingPrevious}
        hasDropdown
        onClick={onCurrentSeason}
      />

      {/* Temporada Passada */}

      <SeasonButton
        label={previousSeason}
        active={viewingPrevious}
        onClick={onPreviousSeason}
      />

      {/* Badge */}

      <CompletedBadge
        total={completed}
      />

    </div>
  )
}