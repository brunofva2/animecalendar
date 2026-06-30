import { NextResponse } from 'next/server'
// CORRIGIDO: Caminho relativo preciso voltando 3 níveis até a raiz e entrando em src/Services ou src/lib
import { supabase } from '@/src/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // 1. Validação básica de campos vazios
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 },
      )
    }

    // 2. Verifica se o e-mail inserido já existe na tabela do banco
    const { data: usuarioExistente } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'Este e-mail já está cadastrado no sistema.' },
        { status: 400 },
      )
    }

    // 3. Criptografa a senha com segurança antes de salvar
    const passwordHash = await bcrypt.hash(password, 10)

    // 4. Insere o novo registro na tabela 'usuarios' do Supabase
    const { error: insertError } = await supabase.from('usuarios').insert([
      {
        name,
        email,
        password_hash: passwordHash,
      },
    ])

    if (insertError) {
      return NextResponse.json(
        {
          error: 'Erro ao registrar no banco de dados: ' + insertError.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Usuário criado com sucesso!' },
      { status: 201 },
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Ocorreu um erro interno no servidor: ' + error.message },
      { status: 500 },
    )
  }
}
