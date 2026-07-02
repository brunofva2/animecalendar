import { HeroBanner } from '../src/components/HeroBanner/HeroBanner'
import { SemanalVisual } from '../src/components/SemanalVisual'
import DailyReleases from '../src/components/DailyReleases/DailyReleases'
import { CalendarioSemanalVisual } from '@/src/components/Calendar/CalendarWeak'
import { getAnimesSemanais } from '../src/Services/animeService'

export default async function Home() {
  let dadosDeAnimes : Anime[] = []

  try {
    dadosDeAnimes = await getAnimesSemanais()
  } catch (err) {
    console.error('Erro ao carregar animes:', err)
  }

  if (dadosDeAnimes.length === 0) {
    return (
      <>
        <HeroBanner />

        <div className="py-24 text-center text-zinc-400">
          Nenhum anime encontrado.
        </div>
      </>
    )
  }

  return (
    <>
      <HeroBanner />

      <SemanalVisual animesIniciais={dadosDeAnimes} />

      <CalendarioSemanalVisual animesIniciais={dadosDeAnimes} />

      <DailyReleases animes={dadosDeAnimes} />
    </>
  )
}