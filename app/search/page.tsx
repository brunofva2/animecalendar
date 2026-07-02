'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimeDetailModal } from '@/src/components/AnimeGrid/AnimeDetailModal'

interface Anime {
  mal_id: number
  title: string
  images: { jpg: { large_image_url: string } }
  episodes: number
  trailer: { url: string }
  status: string
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400">
          Carregando pesquisa...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  useEffect(() => {
    async function fetchSearch() {
      if (!q) {
        setAnimes([])
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&sfw=true`,
        )
        const { data } = await res.json()
        setAnimes(data || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
        setAnimes([])
      }
      setLoading(false)
    }
    fetchSearch()
  }, [q])

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-2">
        {q ? `Resultados para "${q}"` : 'Pesquisar Animes'}
      </h2>

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Carregando resultados...
        </div>
      ) : animes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          Nenhum anime encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {animes.map((anime, index) => (
            <div
              key={`${anime.mal_id}-${index}`}
              onClick={() => setSelectedAnime(anime)}
              className="cursor-pointer hover:scale-105 transition-transform relative group"
            >
              <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-zinc-800">
                {anime.images?.jpg?.large_image_url ? (
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                    Sem imagem
                  </div>
                )}
              </div>
              {anime.status === 'Not yet aired' && (
                <span className="absolute top-2 left-2 text-[10px] font-extrabold bg-blue-600 text-white px-2 py-1 rounded shadow">
                  EM BREVE
                </span>
              )}
              <h3 className="text-sm mt-2 text-white truncate group-hover:text-[#7b2cbf] transition-colors">
                {anime.title}
              </h3>
            </div>
          ))}
        </div>
      )}

      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          ano="N/A"
          temporada="N/A"
        />
      )}
    </div>
  )
}
