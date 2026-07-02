'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { Anime } from '@/src/types/anime'
import { supabase } from '@/src/lib/supabase'

interface AcompanhamentoContextType {
  favoritos: Anime[]

  adicionarAnime: (anime: Anime) => Promise<void>

  removerAnime: (id: number) => Promise<void>

  updateAnimeProgress: (id: number, episodes: number) => Promise<void>

  changeAnimeStatus: (
    id: number,
    newStatus: 'watching' | 'plan_to_watch' | 'completed',
  ) => Promise<void>

  isFavorito: (id: number) => boolean
}

const AcompanhamentoContext = createContext<
  AcompanhamentoContextType | undefined
>(undefined)

export function AcompanhamentoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [favoritos, setFavoritos] = useState<Anime[]>([])

  const { data: session } = useSession()

  // =========================
  // CARREGAR FAVORITOS
  // =========================
  useEffect(() => {
    async function carregarFavoritos() {
      if (!session?.user?.id) return

      const { data, error } = await supabase
        .from('favoritos_anime')
        .select('*')
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Erro ao carregar favoritos:', error)
        return
      }

      const favoritosFormatados: Anime[] = data.map(item => ({
        id: item.anime_id,
        title: item.title,
        image: item.image,
        score: item.score,
        episodes: item.episodes,
        studio: item.studio,
        genres: item.genres,
        diaLancamento: item.dia_lancamento,
        rawBroadcastTime: item.raw_broadcast_time,
        status: item.status,
        startDate: item.start_date,

        episodesWatched: item.episodes_watched,
        userStatus: item.user_status,
      }))

      setFavoritos(favoritosFormatados)
    }

    carregarFavoritos()
  }, [session])

  // =========================
  // ADICIONAR
  // =========================
  const adicionarAnime = async (anime: Anime) => {
    if (!session?.user?.id) {
      console.error('Usuário não autenticado')
      return
    }

    if (favoritos.some(item => item.id === anime.id)) {
      return
    }

    setFavoritos(prev => [...prev, anime])

    const { error } = await supabase.from('favoritos_anime').insert({
      user_id: session.user.id,
      anime_id: anime.id,
      title: anime.title,
      image: anime.image,
      score: anime.score || 0,
      episodes: anime.episodes || 0,
      studio: anime.studio || 'Desconhecido',
      genres: anime.genres || [],
      dia_lancamento: anime.diaLancamento,
      raw_broadcast_time: anime.rawBroadcastTime || null,
      status: anime.status,
      // ADICIONADO: Salvando a data de início no banco
      start_date: anime.startDate,
      episodes_watched: anime.episodesWatched ?? 0,

      user_status: anime.userStatus ?? 'plan_to_watch',
    })

    if (error) {
      console.error('Erro ao adicionar anime:', error)
    }
  }

  // =========================
  // REMOVER
  // =========================
  const removerAnime = async (id: number) => {
    if (!session?.user?.id) return

    setFavoritos(prev => prev.filter(item => item.id !== id))

    const { error } = await supabase
      .from('favoritos_anime')
      .delete()
      .eq('anime_id', id)
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Erro ao remover anime:', error)
    }
  }

  // =========================
  // ATUALIZAR PROGRESSO
  // =========================
  const updateAnimeProgress = async (id: number, episodes: number) => {
    setFavoritos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, episodesWatched: episodes } : item,
      ),
    )

    if (!session?.user?.id) return

    const { error } = await supabase
      .from('favoritos_anime')
      .update({ episodes_watched: episodes })
      .eq('anime_id', id)
      .eq('user_id', session.user.id)

    if (error) console.error('Erro ao atualizar progresso:', error)
  }

  // =========================
  // MUDAR STATUS
  // =========================
  const changeAnimeStatus = async (
    id: number,
    newStatus: 'watching' | 'plan_to_watch' | 'completed',
  ) => {
    setFavoritos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, userStatus: newStatus } : item,
      ),
    )

    if (!session?.user?.id) return

    const { error } = await supabase
      .from('favoritos_anime')
      .update({ user_status: newStatus })
      .eq('anime_id', id)
      .eq('user_id', session.user.id)

    if (error) console.error('Erro ao atualizar status:', error)
  }

  // =========================
  // VERIFICAR FAVORITO
  // =========================
  const isFavorito = (id: number) => {
    return favoritos.some(item => item.id === id)
  }

  return (
    <AcompanhamentoContext.Provider
      value={{
        changeAnimeStatus,
        favoritos,
        updateAnimeProgress,
        adicionarAnime,
        removerAnime,
        isFavorito,
      }}
    >
      {children}
    </AcompanhamentoContext.Provider>
  )
}

export function useAcompanhamento() {
  const context = useContext(AcompanhamentoContext)

  if (!context) {
    throw new Error(
      'useAcompanhamento deve ser usado dentro de um AcompanhamentoProvider',
    )
  }

  return context
}
