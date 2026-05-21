import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { formatCurrency, formatDate } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Calendar } from 'lucide-react';

const ManagementPage: React.FC = () => {
  const { dailyStats, commands } = useApp();
  const [selectedDays, setSelectedDays] = useState(7);
  const [selectedDay, setSelectedDay] = useState<typeof dailyStats[0] | null>(null);

  const chartData = dailyStats.slice(-selectedDays).map(stat => ({
    ...stat,
    date: new Date(stat.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
  }));

  const today = dailyStats[dailyStats.length - 1];
  const yesterday = dailyStats[dailyStats.length - 2];
  
  const revenueChange = yesterday?.revenue 
    ? ((today.revenue - yesterday.revenue) / yesterday.revenue * 100).toFixed(1)
    : 0;
  const profitChange = yesterday?.profit 
    ? ((today.profit - yesterday.profit) / yesterday.profit * 100).toFixed(1)
    : 0;

  const totalRevenue = dailyStats.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = dailyStats.reduce((sum, s) => sum + s.profit, 0);
  const totalCommands = dailyStats.reduce((sum, s) => sum + s.commands, 0);
  const avgTicket = totalCommands > 0 ? totalRevenue / totalCommands : 0;

  // Revenue by category calculation
  const categoryRevenue = commands.reduce((acc, cmd) => {
    cmd.items.forEach(item => {
      const category = item.name.split(' ')[0];
      acc[category] = (acc[category] || 0) + item.price * item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const maxCategoryRevenue = Math.max(...Object.values(categoryRevenue), 1);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">Gestão</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-500">Receita Total</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            <span className="text-sm text-gray-500">Lucro Total</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalProfit)}</p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500">Comandas</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{totalCommands}</p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-gold-500" />
            <span className="text-sm text-gray-500">Ticket Médio</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(avgTicket)}</p>
        </div>
      </div>

      {/* Today vs Yesterday */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80 mb-1">Hoje vs Ontem</p>
          <p className="text-2xl font-bold">{formatCurrency(today?.revenue || 0)}</p>
          <div className={`flex items-center gap-1 mt-2 ${Number(revenueChange) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {Number(revenueChange) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">{Math.abs(Number(revenueChange))}%</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80 mb-1">Lucro Hoje</p>
          <p className="text-2xl font-bold">{formatCurrency(today?.profit || 0)}</p>
          <div className={`flex items-center gap-1 mt-2 ${Number(profitChange) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {Number(profitChange) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">{Math.abs(Number(profitChange))}%</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Receita por Dia</h3>
          <div className="flex gap-2">
            {[7, 14, 30].map(days => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedDays === days
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `R$${v/1000}k`} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={index === chartData.length - 1 ? '#22c55e' : '#4ade80'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Category */}
      <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Receita por Categoria</h3>
        <div className="space-y-3">
          {Object.entries(categoryRevenue).slice(0, 6).map(([category, value]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(value)}</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-dark-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all"
                  style={{ width: `${(value / maxCategoryRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Command History */}
      <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Histórico de Comandas</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Data</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Cliente</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Itens</th>
                <th className="text-right py-3 px-2 text-gray-500 font-medium">Total</th>
                <th className="text-right py-3 px-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {commands.slice(0, 10).map(cmd => (
                <tr key={cmd.id} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg">
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{formatDate(cmd.openedAt)}</td>
                  <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">{cmd.clientName}</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{cmd.items.length}</td>
                  <td className="py-3 px-2 text-right text-primary-500 font-medium">{formatCurrency(cmd.totalPaid || 0)}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      cmd.status === 'open'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}>
                      {cmd.status === 'open' ? 'Aberta' : 'Fechada'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Day Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDay(null)}>
          <div className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Resumo do Dia
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-500" />
                <span className="text-gray-600 dark:text-gray-400">{formatDate(selectedDay.date)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Receita</p>
                  <p className="text-xl font-bold text-primary-500">{formatCurrency(selectedDay.revenue)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Lucro</p>
                  <p className="text-xl font-bold text-green-500">{formatCurrency(selectedDay.profit)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Comandas</p>
                  <p className="text-xl font-bold text-blue-500">{selectedDay.commands}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Itens</p>
                  <p className="text-xl font-bold text-gold-500">{selectedDay.itemsSold}</p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedDay(null)}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPage;
