'use client'

import { motion } from 'framer-motion'

export function HeroBanner() {
  return (
    <section className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1] bg-[#161b33] flex items-end mb-12 border border-white/5 shadow-2xl">
      {/* Imagem de Fundo */}
      <img
        src="https://m.media-amazon.com/images/S/pv-target-images/95bdb2bceeac585309a2b52beff9b5b6daca55d1c9a857155f803c926422b896.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        alt="Hero Banner Solo Leveling"
      />
      {/* Degradê de sobreposição para leitura de texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Conteúdo do Banner */}
      <div className="relative z-10 p-6 md:p-12 w-full md:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-block bg-[#7b2cbf] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 shadow-lg shadow-[#7b2cbf]/20">
            Em Destaque
          </span>

          {/* Título */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl leading-tight">
            Solo Leveling: A Ascensão do Caçador Mais Fraco
          </h1>

          {/* Sinopse */}
          <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl drop-shadow-md font-medium">
            Eles dizem que o que não te mata te deixa mais forte, mas esse não é
            o caso do caçador mais fraco do mundo, Sung Jinwoo. Após ser deixado
            para morrer, ele acorda com um sistema que o permite evoluir.
          </p>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-xl shadow-white/10 text-sm md:text-base">
              Assistir Episódio 1
            </button>
            <button className="bg-black/50 backdrop-blur-md text-white font-bold px-8 py-3 rounded-full border border-white/20 hover:bg-black/80 transition-colors text-sm md:text-base">
              Detalhes
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
