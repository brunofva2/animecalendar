'use client'

import React, { useState, useEffect } from 'react'
import { useAcompanhamento } from '@/src/context/AcompanhamentoContext'
import { Anime } from '@/src/types/anime'
import { Camera, Edit2, Play, CheckCircle, Clock } from 'lucide-react'

export default function ProfilePage() {
  const { favoritos, updateAnimeProgress, changeAnimeStatus, removerAnime } =
    useAcompanhamento()
  const [avatar, setAvatar] = useState(
    'https://picsum.photos/seed/avatar/150/150',
  )
  const [banner, setBanner] = useState(
    'https://picsum.photos/seed/banner/1200/400',
  )
  const [username, setUsername] = useState('Convidado')
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Load profile from localStorage for demo purposes
  useEffect(() => {
    const localProfile = localStorage.getItem('anitrack_profile')
    if (localProfile) {
      const parsed = JSON.parse(localProfile)
      if (parsed.avatar) setAvatar(parsed.avatar)
      if (parsed.banner) setBanner(parsed.banner)
      if (parsed.username) setUsername(parsed.username)
    }
  }, [])

  const saveProfile = () => {
    localStorage.setItem(
      'anitrack_profile',
      JSON.stringify({ avatar, banner, username }),
    )
    setIsEditingProfile(false)
  }

  const watching = favoritos.filter(f => f.userStatus === 'watching')
  const planToWatch = favoritos.filter(f => f.userStatus === 'plan_to_watch')
  const completed = favoritos.filter(f => f.userStatus === 'completed')

  const totalEpisodes = favoritos.reduce(
    (acc, curr) => acc + (curr.episodesWatched || 0),
    0,
  )

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 mt-8">
      {/* Banner & Avatar */}
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-16 shadow-2xl">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        {isEditingProfile && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-[#161b33] p-4 rounded-xl flex flex-col gap-3 w-80">
              <label className="text-sm text-gray-300">URL do Banner</label>
              <input
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none"
                value={banner}
                onChange={e => setBanner(e.target.value)}
              />
              <label className="text-sm text-gray-300 mt-2">
                URL do Avatar
              </label>
              <input
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
              />
              <label className="text-sm text-gray-300 mt-2">
                Nome de Usuário
              </label>
              <input
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button
                onClick={saveProfile}
                className="mt-4 bg-[#7b2cbf] hover:bg-[#7b2cbf]/80 text-white py-2 rounded font-bold"
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* Avatar Positioned at bottom center/left */}
        <div className="absolute -bottom-12 left-8 md:left-12 flex items-end gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-[#0a0a0a] overflow-hidden bg-zinc-800 shadow-xl relative group">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
          <div className="mb-14">
            <h1 className="text-3xl font-black text-white flex items-center gap-2 drop-shadow-md">
              {username}
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-300" />
                </button>
              )}
            </h1>
            <p className="text-gray-200 text-sm drop-shadow">
              Membro da Coleção Pública
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-4 md:px-0 mt-8">
        <div className="bg-[#161b33] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-white">
            {favoritos.length}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            Total de Animes
          </span>
        </div>
        <div className="bg-[#161b33] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-[#7b2cbf]">
            {totalEpisodes}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            Episódios Assistidos
          </span>
        </div>
        <div className="bg-[#161b33] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-green-500">
            {completed.length}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            Concluídos
          </span>
        </div>
        <div className="bg-[#161b33] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-blue-500">
            {planToWatch.length}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            Planejados
          </span>
        </div>
      </div>

      {/* Coleções */}
      <div className="space-y-12 px-4 md:px-0">
        <AnimeSection
          title="Assistindo Agora"
          icon={<Play className="w-5 h-5 text-[#7b2cbf]" />}
          animes={watching}
          onChangeStatus={changeAnimeStatus}
          onUpdateProgress={updateAnimeProgress}
          onRemove={removerAnime}
        />
        <AnimeSection
          title="Planejo Assistir"
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          animes={planToWatch}
          onChangeStatus={changeAnimeStatus}
          onUpdateProgress={updateAnimeProgress}
          onRemove={removerAnime}
        />
        <AnimeSection
          title="Concluídos"
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          animes={completed}
          onChangeStatus={changeAnimeStatus}
          onUpdateProgress={updateAnimeProgress}
          onRemove={removerAnime}
        />
      </div>
    </div>
  )
}

function AnimeSection({
  title,
  icon,
  animes,
  onChangeStatus,
  onUpdateProgress,
  onRemove,
}: {
  title: string
  icon: React.ReactNode
  animes: Anime[]
  onChangeStatus: (
    id: number,
    status: 'watching' | 'plan_to_watch' | 'completed',
  ) => void
  onUpdateProgress: (id: number, episodes: number) => void
  onRemove: (id: number) => void
}) {
  if (animes.length === 0) return null

  return (
    <div>
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
        {icon} {title}{' '}
        <span className="text-sm text-gray-500 font-normal ml-2">
          ({animes.length})
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animes.map(anime => (
          <div
            key={anime.id}
            className="bg-[#161b33] rounded-xl p-4 flex gap-4 relative border border-white/5 hover:border-white/10 transition-colors"
          >
            <img
              src={anime.image}
              alt={anime.title}
              className="w-20 h-28 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                  {anime.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {anime.episodes > 0
                    ? `${anime.episodes} Episódios`
                    : 'Em Lançamento'}
                </p>
              </div>

              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">Progresso:</span>
                  <input
                    type="number"
                    value={anime.episodesWatched || 0}
                    onChange={e =>
                      onUpdateProgress(
                        anime.id,
                        Math.max(0, parseInt(e.target.value) || 0),
                      )
                    }
                    className="w-16 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center"
                  />
                  <span className="text-gray-500">
                    / {anime.episodes > 0 ? anime.episodes : '?'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={anime.userStatus}
                    onChange={e =>
                      onChangeStatus(anime.id, e.target.value as any)
                    }
                    className="text-xs bg-black/50 border border-white/10 rounded px-2 py-1.5 text-white flex-1 focus:outline-none"
                  >
                    <option value="watching">Assistindo</option>
                    <option value="plan_to_watch">Planejo</option>
                    <option value="completed">Concluído</option>
                  </select>
                  <button
                    onClick={() => onRemove(anime.id)}
                    className="text-xs text-red-400 hover:text-red-300 px-2 py-1.5 border border-red-500/20 rounded bg-red-500/10 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
