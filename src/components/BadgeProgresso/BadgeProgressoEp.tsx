interface BadgeProps {
  startDate: string | undefined
  totalEpisodes: number
}

export function BadgeProgressoEp({ startDate, totalEpisodes }: BadgeProps) {
  // A lógica de cálculo centralizada
  const calcularEpAtual = () => {
    if (!startDate || totalEpisodes <= 0) return null

    const estreia = new Date(startDate)
    const hoje = new Date()

    // Anime ainda não estreou
    if (estreia > hoje) return 0

    const diff = Math.floor(
      (hoje.getTime() - estreia.getTime()) / (1000 * 60 * 60 * 24),
    )

    const epAtual = Math.floor(diff / 7) + 1

    return Math.min(epAtual, totalEpisodes)
  }

  const epAtual = calcularEpAtual()

  if (epAtual === null) return null

  const finalizado = totalEpisodes > 0 && epAtual >= totalEpisodes

  return (
    <div className="mt-1">
      {finalizado ? (
        <div className="text-[10px] text-emerald-400 font-bold">
          ✓ FINALIZADO
        </div>
      ) : (
        <div className="text-[10px] text-purple-400 font-bold">
          Ep: {epAtual} / {totalEpisodes}
        </div>
      )}
    </div>
  )
}
