import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/src/components/Navbar/Navbar'
import { AcompanhamentoProvider } from '@/src/context/AcompanhamentoContext'
import { AuthProvider } from '../src/context/AuthProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AniTrack',
  description: 'Seu calendário semanal de animes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">
        {/* INSTALADO: Provedor de Autenticação do NextAuth adicionado */}
        <AuthProvider>
          {/* MODIFICADO: Envelopando o layout global com o Provider de favoritos */}
          <AcompanhamentoProvider>
            {/* Container estrutural seguro da interface */}
            <MainLayout>{children}</MainLayout>
          </AcompanhamentoProvider>
        </AuthProvider>
      </body>
    </html>
  )
}