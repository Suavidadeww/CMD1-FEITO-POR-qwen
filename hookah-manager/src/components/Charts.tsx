'use client'

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const revenueData = [
  { name: 'Seg', value: 1200 },
  { name: 'Ter', value: 1800 },
  { name: 'Qua', value: 1500 },
  { name: 'Qui', value: 2200 },
  { name: 'Sex', value: 3100 },
  { name: 'Sáb', value: 4200 },
  { name: 'Dom', value: 2800 },
]

const categoryData = [
  { name: 'Narguilés', value: 35, color: '#FF6A00' },
  { name: 'Essências', value: 30, color: '#F97316' },
  { name: 'Bebidas', value: 20, color: '#DC2626' },
  { name: 'Lanches', value: 15, color: '#EAB308' },
]

const orderStatusData = [
  { name: 'Pendentes', value: 12, color: '#FACC15' },
  { name: 'Preparando', value: 8, color: '#FF6A00' },
  { name: 'Prontos', value: 5, color: '#22C55E' },
  { name: 'Entregues', value: 45, color: '#FF8A00' },
]

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <div className="card">
        <h3 className="font-sora font-semibold text-lg mb-4 text-textPrimary">
          Receita Semanal
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" tickFormatter={(v) => `R$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  border: '1px solid #2A2A2E',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`R$ ${value}`, 'Receita']}
              />
              <Bar dataKey="value" fill="#FF6A00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Sales */}
      <div className="card">
        <h3 className="font-sora font-semibold text-lg mb-4 text-textPrimary">
          Vendas por Categoria
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  border: '1px solid #2A2A2E',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-sm text-textSecondary">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Trend */}
      <div className="card lg:col-span-2">
        <h3 className="font-sora font-semibold text-lg mb-4 text-textPrimary">
          Tendência de Pedidos
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" />
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  border: '1px solid #2A2A2E',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FF6A00" 
                strokeWidth={3}
                dot={{ fill: '#FF6A00', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
