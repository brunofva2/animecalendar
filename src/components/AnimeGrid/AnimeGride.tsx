'use client'

import { useEffect, useState } from 'react'
import { AnimeDetailModal } from './AnimeDetailModal' // Criaremos este componente abaixo

interface Anime {
  mal_id: number
  title: string
  images: { jpg: { large_image_url: string } }
  episodes: number
  trailer: { url: string }
}

export function AnimeGrid({
  ano,
  temporada,
}: {
  ano: string
  temporada: string
}) {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  useEffect(() => {
    async function fetchAnimes() {
      setLoading(true)
      const res = await fetch(
        `https://api.jikan.moe/v4/seasons/${ano}/${temporada}`,
      )
      const { data } = await res.json()
      setAnimes(data)
      setLoading(false)
    }
    fetchAnimes()
  }, [ano, temporada])

  if (loading)
    return <div className="text-center py-20 text-white">Carregando...</div>

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {animes.map((anime, index) => (
          <div
            key={`${anime.mal_id}-${index}`}
            onClick={() => setSelectedAnime(anime)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={anime.images.jpg.large_image_url}
              className="rounded-xl w-full aspect-[2/3] object-cover"
            />
            <h3 className="text-sm mt-2 text-white truncate">{anime.title}</h3>
          </div>
        ))}
      </div>

      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          ano={ano}
          temporada={temporada}
        />
      )}
    </>
  )
}
