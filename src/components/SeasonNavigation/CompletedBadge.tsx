'use client'

import { CheckCircle2 } from 'lucide-react'

interface CompletedBadgeProps {
  total: number
}

export function CompletedBadge({ total }: CompletedBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-green-700 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-400">
      <CheckCircle2 size={16} />

      <span>{total} completos</span>
    </div>
  )
}
