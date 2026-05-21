'use client'

import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Package
} from 'lucide-react'
import { DashboardStats } from '@/types'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend?: number
  color: string
}

const statsConfig: Array<{
  key: keyof DashboardStats
  title: string
  icon: React.ElementType
  formatValue: (value: number) => string
  color: string
}> = [
  {
    key: 'todayRevenue',
    title: 'Receita Hoje',
    icon: DollarSign,
    formatValue: (v) => `R$ ${v.toFixed(2)}`,
    color: 'text-success',
  },
  {
    key: 'pendingOrders',
    title: 'Pedidos Pendentes',
    icon: ShoppingCart,
    formatValue: (v) => v.toString(),
    color: 'text-warning',
  },
  {
    key: 'monthlyRevenue',
    title: 'Receita Mensal',
    icon: TrendingUp,
    formatValue: (v) => `R$ ${(v / 1000).toFixed(1)}k`,
    color: 'text-primary',
  },
  {
    key: 'lowStockProducts',
    title: 'Estoque Baixo',
    icon: AlertTriangle,
    formatValue: (v) => v.toString(),
    color: 'text-error',
  },
]

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsConfig.map((config) => {
        const Icon = config.icon
        const value = stats[config.key]
        
        return (
          <div
            key={config.key}
            className="card-highlight relative overflow-hidden group"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-textSecondary text-sm font-medium mb-1">
                  {config.title}
                </p>
                <p className={`text-3xl font-sora font-bold ${config.color}`}>
                  {config.formatValue(value as number)}
                </p>
              </div>
              
              <div className="p-3 bg-card rounded-xl border border-border">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>
        )
      })}
      
      {/* Additional stats */}
      <div className="card-highlight relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-textSecondary text-sm font-medium mb-1">
              Total Pedidos
            </p>
            <p className="text-3xl font-sora font-bold text-textPrimary">
              {stats.totalOrders}
            </p>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border">
            <ShoppingCart className="w-6 h-6 text-neon" />
          </div>
        </div>
      </div>
      
      <div className="card-highlight relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-textSecondary text-sm font-medium mb-1">
              Mesas Ativas
            </p>
            <p className="text-3xl font-sora font-bold text-textPrimary">
              {stats.activeTables}
            </p>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border">
            <Users className="w-6 h-6 text-lightOrange" />
          </div>
        </div>
      </div>
      
      <div className="card-highlight relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-textSecondary text-sm font-medium mb-1">
              Produtos
            </p>
            <p className="text-3xl font-sora font-bold text-textPrimary">
              --
            </p>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border">
            <Package className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
