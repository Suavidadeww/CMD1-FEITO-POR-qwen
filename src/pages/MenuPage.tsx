import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { formatCurrency, calculateMargin, calculateProfit } from '../utils/helpers';
import { Search, Grid, List, Plus, Edit2, Trash2, Star, Eye, DollarSign, Percent } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof menuItems[0] | null>(null);

  const categories = ['Todos', ...Array.from(new Set(menuItems.map(i => i.category.split(' ')[1])))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const activeItems = menuItems.filter(i => i.isActive);
  const avgMargin = activeItems.length > 0 
    ? activeItems.reduce((sum, i) => sum + calculateMargin(i.price, i.cost), 0) / activeItems.length 
    : 0;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Cardápio</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">Novo Item</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Ativos</p>
          <p className="text-lg md:text-2xl font-bold text-primary-500">{activeItems.length}</p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Margem Média</p>
          <p className="text-lg md:text-2xl font-bold text-gold-500">{avgMargin.toFixed(1)}%</p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-xs md:text-sm text-gray-500">Destaques</p>
          <p className="text-lg md:text-2xl font-bold text-blue-500">{menuItems.filter(i => i.isFeatured).length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar item..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card outline-none focus:border-primary-500"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Items Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm ${!item.isActive ? 'opacity-50' : ''}`}
            >
              <div className="relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover" />
                {item.isFeatured && (
                  <div className="absolute top-2 right-2 bg-gold-500 text-white p-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary-500 font-bold">{formatCurrency(item.price)}</span>
                  <span className="text-xs text-green-500">{calculateMargin(item.price, item.cost).toFixed(0)}% marg.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm flex items-center gap-4 ${!item.isActive ? 'opacity-50' : ''}`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  {item.isFeatured && <Star className="w-4 h-4 text-gold-500 fill-current" />}
                </div>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-primary-500 font-bold">{formatCurrency(item.price)}</span>
                  <span className="text-xs text-gray-500">Custo: {formatCurrency(item.cost)}</span>
                  <span className="text-xs text-green-500">Lucro: {formatCurrency(calculateProfit(item.price, item.cost))}</span>
                  <span className="text-xs text-green-500">{calculateMargin(item.price, item.cost).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateMenuItem(item.id, { isActive: !item.isActive })}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    item.isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {item.isActive ? 'Ativo' : 'Inativo'}
                </button>
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome do item"
                defaultValue={editingItem?.name}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg outline-none focus:border-primary-500"
              />
              
              <select
                defaultValue={editingItem?.category || '🌿 Narguilé'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg outline-none focus:border-primary-500"
              >
                <option value="🌿 Narguilé">🌿 Narguilé</option>
                <option value="🍺 Alcoólicas">🍺 Alcoólicas</option>
                <option value="🥤 Não Alcoólicas">🥤 Não Alcoólicas</option>
                <option value="☕ Quentes">☕ Quentes</option>
                <option value="🍟 Petiscos">🍟 Petiscos</option>
                <option value="🎱 Sinuca">🎱 Sinuca</option>
              </select>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Preço (R$)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    defaultValue={editingItem?.price}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Custo (R$)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    defaultValue={editingItem?.cost}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              
              {/* Live margin preview */}
              <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3">
                <p className="text-sm text-gray-500 mb-2">Margem em tempo real</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-500 font-medium">Lucro:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency((editingItem?.price || 0) - (editingItem?.cost || 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-green-500 font-medium">Margem:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {calculateMargin(editingItem?.price || 0, editingItem?.cost || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <input
                type="url"
                placeholder="URL da imagem"
                defaultValue={editingItem?.imageUrl}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg outline-none focus:border-primary-500"
              />
              
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={editingItem?.isFeatured}
                  className="w-5 h-5"
                />
                <Star className="w-5 h-5 text-gold-500" />
                <span>Marcar como destaque</span>
              </label>
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                >
                  {editingItem ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
