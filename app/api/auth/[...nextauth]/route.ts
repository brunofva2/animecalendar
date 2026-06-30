import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/src/lib/supabase'
import bcrypt from 'bcryptjs'

// ADICIONADO: Injeção de tipagem para o TypeScript aceitar a propriedade 'id' em session.user
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Campos obrigatórios ausentes.')
        }

        // 1. Busca o usuário na sua tabela do Supabase pelo e-mail
        const { data: usuario, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', credentials.email)
          .maybeSingle()

        if (error || !usuario) {
          throw new Error('Nenhum usuário encontrado com este e-mail.')
        }

        // 2. Compara a senha digitada com o hash salvo no banco (sua coluna password_hash)
        const senhaValida = await bcrypt.compare(
          credentials.password,
          usuario.password_hash,
        )

        if (!senhaValida) {
          throw new Error('Senha incorreta.')
        }

        // 3. Retorna os dados do usuário para criar a sessão do NextAuth
        return {
          id: String(usuario.id), // Força como string para evitar conflitos no NextAuth
          name: usuario.name,
          email: usuario.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Transfere o ID do usuário do banco de dados para o Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    // Transfere o ID do Token JWT para a sessão que o front-end lê
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // <--- ADICIONE ESTA LINHA AQUI
})

export { handler as GET, handler as POST }
