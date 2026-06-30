'use client'

import React, { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

interface RegisterFormProps {
  onToggleForm: () => void
}

export function RegisterForm({ onToggleForm }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar o cadastro.')
      }

      setSuccess('Conta criada com sucesso! Redirecionando...')
      setTimeout(() => {
        onToggleForm()
      }, 1500)
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
          {success}
        </div>
      )}

      <Input
        label="Nome de Usuário"
        type="text"
        placeholder="Seu nickname"
        icon={<User size={18} />}
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="nome@exemplo.com"
        icon={<Mail size={18} />}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Crie uma senha forte"
        icon={<Lock size={18} />}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading} className="mt-6">
        Criar Conta
      </Button>

      <div className="text-center text-xs text-slate-500 mt-6">
        Já possui uma conta?{' '}
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-indigo-400 hover:underline transition-colors"
        >
          Fazer login
        </button>
      </div>
    </form>
  )
}
