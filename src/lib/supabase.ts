import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam as variáveis de ambiente do Supabase no arquivo .env.local',
  )
}

// CORRIGIDO: Agora a conexão está sendo propriamente exportada com o nome correto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
