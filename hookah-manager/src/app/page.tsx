'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import PasswordScreen from '@/components/PasswordScreen'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  // Prevent SSR issues
  useEffect(() => {
    // Client-side only logic handled in AuthContext
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <svg className="animate-spin h-16 w-16 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
          <p className="text-textSecondary">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-64 pt-20 lg:pt-0">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="font-sora font-bold text-3xl mb-2">
                Bem-vindo ao <span className="text-gradient">HookahManager</span>
              </h1>
              <p className="text-textSecondary">
                Sistema de gestão completo para seu estabelecimento
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card-highlight">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora font-semibold text-lg">Pedidos Hoje</h3>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-textPrimary">0</p>
                <p className="text-sm text-textSecondary mt-1">Aguardando início</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora font-semibold text-lg">Receita do Dia</h3>
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-textPrimary">R$ 0,00</p>
                <p className="text-sm text-textSecondary mt-1">Total acumulado</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora font-semibold text-lg">Mesas Ativas</h3>
                  <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-textPrimary">0/8</p>
                <p className="text-sm text-text-secondary mt-1">Mesas ocupadas</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora font-semibold text-lg">Estoque Baixo</h3>
                  <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-textPrimary">0</p>
                <p className="text-sm text-textSecondary mt-1">Produtos críticos</p>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-sora font-semibold text-xl mb-4">Acesso Rápido</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="/orders" className="btn-primary text-center">
                    Novo Pedido
                  </a>
                  <a href="/products" className="btn-secondary text-center">
                    Ver Produtos
                  </a>
                  <a href="/customers" className="btn-secondary text-center">
                    Clientes
                  </a>
                  <a href="/inventory" className="btn-secondary text-center">
                    Estoque
                  </a>
                </div>
              </div>

              <div className="card">
                <h3 className="font-sora font-semibold text-xl mb-4">Informações</h3>
                <div className="space-y-3 text-textSecondary">
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sistema seguro com autenticação por senha
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dados armazenados no Supabase
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Interface premium responsiva
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
