'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  Package, 
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  CylinderSmoke
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ShoppingBag, label: 'Produtos', href: '/products' },
  { icon: ClipboardList, label: 'Pedidos', href: '/orders' },
  { icon: Users, label: 'Clientes', href: '/customers' },
  { icon: Package, label: 'Estoque', href: '/inventory' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <CylinderSmoke className="w-8 h-8 text-primary" />
          <span className="font-sora font-bold text-xl text-gradient">HookahManager</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-cardHighlight rounded-lg transition-colors"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/80 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-secondary border-r border-border z-50
        transition-all duration-300 ease-in-out
        lg:w-64 ${isCollapsed ? 'lg:w-20' : ''}
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        pt-20 lg:pt-0
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <CylinderSmoke className="w-10 h-10 text-primary glow-orange" />
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full" />
            </div>
            {!isCollapsed && (
              <span className="font-sora font-bold text-2xl text-gradient whitespace-nowrap">
                HookahManager
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-neon-accent text-white shadow-neon' 
                    : 'text-textSecondary hover:bg-cardHighlight hover:text-textPrimary'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 border-t border-border">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`
              flex items-center gap-3 px-4 py-3 w-full rounded-xl
              text-textSecondary hover:bg-cardHighlight hover:text-textPrimary
              transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!isCollapsed && <span className="font-medium">Tema</span>}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-4 py-3 w-full rounded-xl
              text-error hover:bg-error/10 transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Collapse button (desktop only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex fixed top-1/2 -right-4 transform -translate-y-1/2 z-50
          w-8 h-8 bg-primary hover:bg-neon rounded-full items-center justify-center
          shadow-neon transition-all duration-200"
      >
        {isCollapsed ? (
          <Menu className="w-4 h-4 text-white" />
        ) : (
          <X className="w-4 h-4 text-white" />
        )}
      </button>
    </>
  )
}
