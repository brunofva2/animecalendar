import { HeroBanner } from '../src/components/HeroBanner/HeroBanner'
import { SemanalVisual } from '../src/components/SemanalVisual'
import DailyReleases from '../src/components/DailyReleases/DailyReleases'
import { CalendarioSemanalVisual } from '@/src/components/Calendar/CalendarWeak'
import { getAnimesSemanais } from '../src/Services/animeService'

export default async function Home() {
  const dadosDeAnimes = await getAnimesSemanais()

  return (
    <>
      {/* Banner Principal */}
      <HeroBanner />

      {/* Animes que passam no dia atual */}
      <SemanalVisual animesIniciais={dadosDeAnimes} />

      {/* Calendário Semanal Inteligente com Filtro integrado e Modal de Gerenciamento */}
      <CalendarioSemanalVisual animesIniciais={dadosDeAnimes} />

      {/* Lançamentos da Temporada Compactos */}
      <DailyReleases animes={dadosDeAnimes} />
    </>
  )
}
