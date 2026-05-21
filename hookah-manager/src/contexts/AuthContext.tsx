'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || 'suasenha'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('hookah_manager_session')
      if (session === 'authenticated') {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    setError(null)
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (password === APP_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('hookah_manager_session', 'authenticated')
      }
      setIsAuthenticated(true)
      return true
    } else {
      setError('Senha incorreta. Tente novamente.')
      return false
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hookah_manager_session')
    }
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
