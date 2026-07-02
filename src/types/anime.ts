export interface Anime {
  // Dados básicos
  id: number
  title: string
  image: string
  score: number
  episodes: number
  studio: string
  genres: string[]

  // Exibição
  diaLancamento: string
  rawBroadcastTime?: string
  streaming?: string[]
  status?: string

  // Acompanhamento
  startDate?: string
  userStatus?: 'watching' | 'plan_to_watch' | 'completed'
  episodesWatched?: number
}
