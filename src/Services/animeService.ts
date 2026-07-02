import { Anime } from '../types/anime'

// Dicionário inteligente auxiliar para injetar streamings que a API Jikan deixa vazios
function mapearStreamingLocal(title: string, apiStreamings: any[]): string[] {
  const titleLower = title.toLowerCase()
  const plataformas: string[] = []

  // 1. Se a API já trouxe alguma coisa válida, nós usamos
  if (apiStreamings && apiStreamings.length > 0) {
    apiStreamings.forEach((s: any) => plataformas.push(s.name.toLowerCase()))
  }

  // 2. Se veio vazio, injetamos com base nos grandes lançamentos monitorados da temporada
  if (plataformas.length === 0) {
    if (
      titleLower.includes('solo leveling') ||
      titleLower.includes('stone') ||
      titleLower.includes('frieren') ||
      titleLower.includes('kaiju') ||
      titleLower.includes('classroom of the elite') ||
      titleLower.includes('re:zero')
    ) {
      return ['crunchyroll']
    }

    if (
      titleLower.includes('dan da dan') ||
      titleLower.includes('one piece') ||
      titleLower.includes('terminator') ||
      titleLower.includes('delicious in dungeon')
    ) {
      return ['netflix']
    }

    // Padrão caso seja um anime comum de temporada transmitido mundialmente por canais de simulcast
    return ['crunchyroll']
  }

  return plataformas
}

export async function getAnimesSemanais(): Promise<Anime[]> {
  const response = await fetch('https://api.jikan.moe/v4/seasons/now', {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error('Erro ao conectar com a API de Animes')
  }

  const data = await response.json()

  const todosAnimes: Anime[] = data.data.map((item: any) => {
    const tituloDefinido = item.title_english ?? item.title

    return {
      id: item.mal_id,
      title: tituloDefinido,
      image:
        item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? '',
      score: item.score ?? 0,
      episodes: item.episodes ?? 0,
      studio: item.studios?.[0]?.name ?? 'Desconhecido',
      genres:
        item.genres?.slice(0, 3).map((g: any) => g.name.toUpperCase()) ?? [],
      diaLancamento: traduzirDia(item.broadcast?.day),
      streaming: mapearStreamingLocal(tituloDefinido, item.streaming || []),
      rawBroadcastTime: item.broadcast?.time || 'Unknown',
      status: item.status,
      // ADICIONADO: Extração da data de início da API Jikan
      // item.aired.from retorna algo como "2026-06-01T00:00:00+00:00"
      startDate: item.aired?.from || null,
    }
  })

  return Array.from(
    new Map(todosAnimes.map(anime => [anime.title, anime])).values(),
  )
}

function traduzirDia(dayEn: string): string {
  if (!dayEn) return 'Dom'
  const day = dayEn.toLowerCase()
  if (day.includes('monday')) return 'Seg'
  if (day.includes('tuesday')) return 'Ter'
  if (day.includes('wednesday')) return 'Qua'
  if (day.includes('thursday')) return 'Qui'
  if (day.includes('friday')) return 'Sex'
  if (day.includes('saturday')) return 'Sáb'
  if (day.includes('sunday')) return 'Dom'
  return 'Seg'
}
