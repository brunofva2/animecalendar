'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h2>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  )
}
