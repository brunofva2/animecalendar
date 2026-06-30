'use client'
import { useRouter } from 'next/navigation'

export function FilterBar({
  currentAno,
  currentTemporada,
}: {
  currentAno: string
  currentTemporada: string
}) {
  const router = useRouter()

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set(key, value)
    // Corrigido para a pasta /temporadas
    router.push(`/temporadas?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 mb-8">
      <select
        className="bg-[#161b33] text-white p-2 rounded-lg border border-white/10"
        onChange={e => handleFilter('ano', e.target.value)}
        value={currentAno}
      >
        {[2026, 2025, 2024].map(ano => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>

      <select
        className="bg-[#161b33] text-white p-2 rounded-lg border border-white/10"
        onChange={e => handleFilter('temporada', e.target.value)}
        value={currentTemporada}
      >
        <option value="winter">Inverno</option>
        <option value="spring">Primavera</option>
        <option value="summer">Verão</option>
        <option value="fall">Outono</option>
      </select>
    </div>
  )
}
