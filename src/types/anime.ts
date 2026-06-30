export interface Anime {
  id: number
  title: string
  image: string
  score: number
  episodes: number // Total de episódios da obra
  studio: string
  genres: string[]
  diaLancamento: string
  startDate?: string // Nova base para o cálculo
  status?: string // Mantemos como opcional
  startDate?: string
}
