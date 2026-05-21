import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Search, TrendingUp, Calendar, DollarSign, History } from 'lucide-react';

const ClientsPage: React.FC = () => {
  const { clients, commands } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cpf.includes(searchTerm)
  );

  const getClientStats = (clientId: string) => {
    const clientCommands = commands.filter(c => c.clientId === clientId && c.status === 'closed');
    const totalSpent = clientCommands.reduce((sum, c) => sum + (c.totalPaid || 0), 0);
    const totalVisits = clientCommands.length;
    const ticketMedio = totalVisits > 0 ? totalSpent / totalVisits : 0;
    
    return { totalSpent, totalVisits, ticketMedio };
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">Clientes</h2>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou CPF"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card outline-none focus:border-primary-500"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Total</p>
          <p className="text-lg md:text-2xl font-bold text-primary-500">{clients.length}</p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Visitantes Hoje</p>
          <p className="text-lg md:text-2xl font-bold text-gold-500">
            {new Set(commands.filter(c => c.openedAt.startsWith(new Date().toISOString().split('T')[0])).map(c => c.clientId)).size}
          </p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Ticket Médio</p>
          <p className="text-lg md:text-2xl font-bold text-blue-500">
            {formatCurrency(clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.length || 0)}
          </p>
        </div>
      </div>

      {/* Clients List */}
      <div className="space-y-3">
        {filteredClients.map(client => {
          const stats = getClientStats(client.id);
          return (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-500">{client.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.cpf}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{stats.totalVisits} visitas</p>
                  <p className="font-bold text-primary-500">{formatCurrency(stats.totalSpent)}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredClients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedClient(null)}>
          <div className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedClient.name}</h3>
                  <p className="text-white/80">{selectedClient.cpf}</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>Cadastro: {formatDate(selectedClient.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-5 h-5" />
                <span>WhatsApp: {selectedClient.whatsapp}</span>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                  <History className="w-5 h-5 mx-auto mb-1 text-primary-500" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{getClientStats(selectedClient.id).totalVisits}</p>
                  <p className="text-xs text-gray-500">Visitas</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(getClientStats(selectedClient.id).totalSpent)}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(getClientStats(selectedClient.id).ticketMedio)}</p>
                  <p className="text-xs text-gray-500">Ticket</p>
                </div>
              </div>

              {/* Command History */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Histórico de Comandas</h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {commands.filter(c => c.clientId === selectedClient.id && c.status === 'closed').slice(0, 5).map(cmd => (
                    <div key={cmd.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-bg rounded-lg text-sm">
                      <span className="text-gray-500">{formatDate(cmd.closedAt || cmd.openedAt)}</span>
                      <span className="font-medium text-primary-500">{formatCurrency(cmd.totalPaid || 0)}</span>
                    </div>
                  ))}
                  {commands.filter(c => c.clientId === selectedClient.id && c.status === 'closed').length === 0 && (
                    <p className="text-gray-500 text-sm">Nenhuma comanda fechada</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
