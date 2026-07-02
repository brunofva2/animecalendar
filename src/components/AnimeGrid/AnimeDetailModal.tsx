'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Heart, Check } from 'lucide-react'
import { useAcompanhamento } from '@/context/AcompanhamentoContext'
import { Anime } from '@/src/types/anime'



interface AnimeDetailModalProps {
  anime: Anime & {
    mal_id?: number
  }
  onClose: () => void
  ano: number
  temporada: string
}

export function AnimeDetailModal({
  anime,
  onClose,
  ano,
  temporada,
}: AnimeDetailModalProps) {
  const { data: session } = useSession()

  const [fullData, setFullData] = useState(anime)

  

  const { adicionarAnime, removerAnime, isFavorito } = useAcompanhamento()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

 useEffect(() => {
   async function fetchFullDetails() {
     try {
       

       const res = await fetch(
         `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`,
       )

       const result = await res.json()

       setFullData(result.data)
     } catch (error) {
       console.error(error)
     } 
   }

   fetchFullDetails()
 }, [anime.mal_id])

  const animeId = fullData?.mal_id ?? anime.id

  const salvo = isFavorito(animeId)

  const handleFavorito = async () => {
    const animeFormatado = {
      id: animeId,
      title: fullData.title,
      image:
        fullData.images?.jpg?.large_image_url ??
        fullData.images?.jpg?.image_url?? '',
      score: fullData.score ?? 0,
      episodes: fullData.episodes ?? 0, // Total planejado (num_episodes)
      startDate: fullData.aired?.from, // NOVA BASE DE CÁLCULO
      studio: fullData.studios?.[0]?.name || 'N/A',
      genres: fullData.genres?.map((g: any) => g.name) || [],
      diaLancamento: 'Seg',
      rawBroadcastTime: null,
      status: fullData.status ?? 'Unknown',
      episodesWatched: 0,
      userStatus: 'plan_to_watch',
    }

    if (salvo) {
      await removerAnime(animeId)
    } else {
      await adicionarAnime(animeFormatado)
    }
  }
  
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b1329] border border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row max-h-[85vh]">
          <div className="md:w-1/3 p-6 shrink-0">
            <img
              src={
                fullData.images?.jpg?.large_image_url ??
                fullData.images?.jpg?.image_url ??
                ''
              }
              className="rounded-xl w-full shadow-lg"
              alt={fullData.title}
            />

            {session && (
              <button
                onClick={handleFavorito}
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  salvo
                    ? 'bg-green-600 text-white'
                    : 'bg-[#7b2cbf] hover:bg-[#62239a] text-white'
                }`}
              >
                {salvo ? (
                  <>
                    <Check size={18} /> Adicionado
                  </>
                ) : (
                  <>
                    <Heart size={18} /> Adicionar à lista
                  </>
                )}
              </button>
            )}
          </div>

          <div className="md:w-2/3 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {fullData.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">
              <span>
                {temporada.toUpperCase()} {ano}
              </span>
              <span>•</span>
              <span>{fullData.episodes ?? '??'} episódios</span>
              <span className="text-[#7b2cbf] font-bold">
                {fullData.status}
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm mb-6">
              {fullData.synopsis || 'Sinopse não disponível.'}
            </p>
            {fullData.trailer?.embed_url && (
              <div className="mt-4">
                <p className="text-xs font-bold text-zinc-500 uppercase mb-2">
                  Trailer
                </p>
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/5 bg-black">
                  <iframe
                    src={fullData.trailer.embed_url}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
