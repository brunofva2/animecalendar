import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Verifica se o cookie de visitante está ativo no navegador
  const isVisitor = req.cookies.has('anitrack_visitor')

  // Se a pessoa tentar acessar a raiz '/'...
  if (pathname === '/') {
    // Se ela NÃO estiver logada E TAMBÉM NÃO for visitante, manda pro Login
    if (!token && !isVisitor) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'], // Monitora apenas a porta de entrada do site
}
