import { FilterBar } from '@/src/components/FilterBar/FilterBar'
import { AnimeGrid } from '@/src/components/AnimeGrid/AnimeGride'

// O componente de página agora deve ser async
export default async function TemporadasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  // Await para resolver a Promise
  const params = await searchParams

  const anoAtual = new Date().getFullYear()
  const anoSelecionado = params.ano || anoAtual.toString()
  const temporadaSelecionada = params.temporada || 'spring'

  return (
    <div className="container mx-auto pt-32 pb-10 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">
            Catálogo de Temporadas
          </h1>
          <p className="text-slate-400">
            Explore o catálogo completo de animes por período.
          </p>
        </div>

        <FilterBar
          currentAno={anoSelecionado}
          currentTemporada={temporadaSelecionada}
        />
      </div>

      <AnimeGrid ano={anoSelecionado} temporada={temporadaSelecionada} />
    </div>
  )
}
