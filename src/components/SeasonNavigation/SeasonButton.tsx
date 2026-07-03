'use client'

import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface SeasonButtonProps {
  label: string
  active?: boolean
  hasDropdown?: boolean
  onClick?: () => void
}

export function SeasonButton({
  label,
  active = false,
  hasDropdown = false,
  onClick,
}: SeasonButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all',
        active
          ? 'border-purple-500 bg-purple-600 text-white'
          : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-purple-500 hover:text-white',
      )}
    >
      <span>{label}</span>

      {hasDropdown && <ChevronDown size={16} />}
    </button>
  )
}
