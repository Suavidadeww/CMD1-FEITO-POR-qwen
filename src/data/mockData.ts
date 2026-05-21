import { MenuItem, Client, Command, DailyStats } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Menu items with realistic data
export const menuItems: MenuItem[] = [
  // Narguilé (8 items)
  { id: generateId(), name: 'Narguilé Tradicional', category: '🌿 Narguilé', price: 45, cost: 18, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1542844022-8048c5f8b1d6?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Narguilé Premium', category: '🌿 Narguilé', price: 60, cost: 25, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Narguilé Frutas Cítricas', category: '🌿 Narguilé', price: 50, cost: 20, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1542844022-8048c5f8b1d6?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Narguilé Menta', category: '🌿 Narguilé', price: 48, cost: 19, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Narguilé Blueberry', category: '🌿 Narguilé', price: 52, cost: 21, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1542844022-8048c5f8b1d6?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Narguilé Morango', category: '🌿 Narguilé', price: 50, cost: 20, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Narguilé Maçã', category: '🌿 Narguilé', price: 48, cost: 19, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1542844022-8048c5f8b1d6?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Narguilé Especial da Casa', category: '🌿 Narguilé', price: 70, cost: 30, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: true, isActive: true },

  // Alcoólicas (13 items)
  { id: generateId(), name: 'Cerveja Artesanal IPA', category: '🍺 Alcoólicas', price: 28, cost: 12, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Cerveja Pilsen', category: '🍺 Alcoólicas', price: 18, cost: 8, unit: '600ml', imageUrl: 'https://images.unsplash.com/photo-1605218427306-635ba2439af2?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Caipirinha de Limão', category: '🍺 Alcoólicas', price: 25, cost: 10, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf7f5b11b8?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Caipirinha de Morango', category: '🍺 Alcoólicas', price: 28, cost: 12, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf7f5b11b8?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Gin Tônica', category: '🍺 Alcoólicas', price: 35, cost: 15, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Mojito', category: '🍺 Alcoólicas', price: 30, cost: 12, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf7f5b11b8?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Whisky on the Rocks', category: '🍺 Alcoólicas', price: 40, cost: 18, unit: 'dose', imageUrl: 'https://images.unsplash.com/photo-1527281400684-19bf595f9cae?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Vodka Red Bull', category: '🍺 Alcoólicas', price: 32, cost: 14, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Batida de Coco', category: '🍺 Alcoólicas', price: 22, cost: 9, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf7f5b11b8?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Chopp', category: '🍺 Alcoólicas', price: 15, cost: 6, unit: '400ml', imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Espumante Taça', category: '🍺 Alcoólicas', price: 38, cost: 16, unit: 'taça', imageUrl: 'https://images.unsplash.com/photo-1598155523122-3ad4e32a74ce?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Vinho Tinto Taça', category: '🍺 Alcoólicas', price: 32, cost: 14, unit: 'taça', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Sex on the Beach', category: '🍺 Alcoólicas', price: 35, cost: 15, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', isFeatured: false, isActive: true },

  // Não Alcoólicas (8 items)
  { id: generateId(), name: 'Refrigerante Lata', category: '🥤 Não Alcoólicas', price: 8, cost: 3, unit: '350ml', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Suco Natural de Laranja', category: '🥤 Não Alcoólicas', price: 14, cost: 5, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1613478223719-0ab4ddaa3c80?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Suco de Uva', category: '🥤 Não Alcoólicas', price: 14, cost: 5, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1613478223719-0ab4ddaa3c80?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Água com Gás', category: '🥤 Não Alcoólicas', price: 6, cost: 2, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Água sem Gás', category: '🥤 Não Alcoólicas', price: 5, cost: 2, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Energético', category: '🥤 Não Alcoólicas', price: 16, cost: 7, unit: '250ml', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Limonada Suíça', category: '🥤 Não Alcoólicas', price: 12, cost: 4, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1613478223719-0ab4ddaa3c80?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Iced Tea', category: '🥤 Não Alcoólicas', price: 10, cost: 4, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1613478223719-0ab4ddaa3c80?w=400', isFeatured: false, isActive: true },

  // Quentes (6 items)
  { id: generateId(), name: 'Café Expresso', category: '☕ Quentes', price: 8, cost: 2, unit: 'xícara', imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Cappuccino', category: '☕ Quentes', price: 16, cost: 5, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Latte Macchiato', category: '☕ Quentes', price: 18, cost: 6, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Chocolate Quente', category: '☕ Quentes', price: 14, cost: 5, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Chá Variados', category: '☕ Quentes', price: 10, cost: 3, unit: 'un', imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Chá Gelado', category: '☕ Quentes', price: 12, cost: 4, unit: '500ml', imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400', isFeatured: false, isActive: true },

  // Petiscos (7 items)
  { id: generateId(), name: 'Batata Frita', category: '🍟 Petiscos', price: 32, cost: 12, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1573080496987-aeb4d9170d5c?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Nuggets', category: '🍟 Petiscos', price: 28, cost: 10, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1562967963-ed7b6f968886?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Onion Rings', category: '🍟 Petiscos', price: 30, cost: 11, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Dadinhos de Tapioca', category: '🍟 Petiscos', price: 35, cost: 14, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Isca de Frango', category: '🍟 Petiscos', price: 38, cost: 15, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Tábua de Frios', category: '🍟 Petiscos', price: 65, cost: 28, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1631379578550-703820bb42bd?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Amendoim', category: '🍟 Petiscos', price: 18, cost: 6, unit: 'porção', imageUrl: 'https://images.unsplash.com/photo-1598155523122-3ad4e32a74ce?w=400', isFeatured: false, isActive: true },

  // Sinuca (3 items)
  { id: generateId(), name: 'Sinuca - 30 min', category: '🎱 Sinuca', price: 25, cost: 5, unit: '30min', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: true, isActive: true },
  { id: generateId(), name: 'Sinuca - 1 hora', category: '🎱 Sinuca', price: 45, cost: 8, unit: 'hora', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: false, isActive: true },
  { id: generateId(), name: 'Sinuca - Período', category: '🎱 Sinuca', price: 80, cost: 12, unit: 'período', imageUrl: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7a1?w=400', isFeatured: false, isActive: true },
];

// Clients
export const clients: Client[] = [
  { id: generateId(), name: 'João Silva', cpf: '123.456.789-00', whatsapp: '(11) 99999-1111', createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), totalVisits: 8, totalSpent: 450 },
  { id: generateId(), name: 'Maria Santos', cpf: '234.567.890-11', whatsapp: '(11) 99999-2222', createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), totalVisits: 12, totalSpent: 780 },
  { id: generateId(), name: 'Pedro Oliveira', cpf: '345.678.901-22', whatsapp: '(11) 99999-3333', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), totalVisits: 3, totalSpent: 180 },
  { id: generateId(), name: 'Ana Costa', cpf: '456.789.012-33', whatsapp: '(11) 99999-4444', createdAt: new Date(Date.now() - 86400000 * 45).toISOString(), totalVisits: 15, totalSpent: 920 },
  { id: generateId(), name: 'Carlos Ferreira', cpf: '567.890.123-44', whatsapp: '(11) 99999-5555', createdAt: new Date(Date.now() - 86400000 * 20).toISOString(), totalVisits: 6, totalSpent: 340 },
];

// Generate daily stats for 30 days
export const generateDailyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const baseRevenue = isWeekend ? 2500 : 1500;
    const variance = Math.random() * 800 - 400;
    const revenue = Math.round(baseRevenue + variance);
    const profitMargin = 0.55 + Math.random() * 0.15;
    const profit = Math.round(revenue * profitMargin);
    const commands = Math.floor(revenue / (150 + Math.random() * 50));
    const itemsSold = commands * (3 + Math.floor(Math.random() * 4));
    
    stats.push({
      date: date.toISOString().split('T')[0],
      revenue,
      profit,
      commands,
      itemsSold,
    });
  }
  
  return stats;
};

// Generate some open and closed commands
export const generateCommands = (): Command[] => {
  const commands: Command[] = [];
  const now = new Date();
  
  // Open commands (3 active)
  const openCommandData = [
    { table: '01', client: 'João Silva', items: 3 },
    { table: '05', client: 'Cliente Balcão', items: 2 },
    { table: '08', client: 'Maria Santos', items: 5 },
  ];
  
  openCommandData.forEach((data, idx) => {
    const command: Command = {
      id: generateId(),
      tableNumber: data.table,
      clientName: data.client,
      clientId: idx < 2 ? clients[idx]?.id : undefined,
      items: Array(data.items).fill(null).map(() => ({
        menuItemId: menuItems[Math.floor(Math.random() * menuItems.length)].id,
        name: menuItems[Math.floor(Math.random() * menuItems.length)].name,
        price: menuItems[Math.floor(Math.random() * menuItems.length)].price,
        quantity: 1 + Math.floor(Math.random() * 3),
        observation: Math.random() > 0.7 ? 'Sem gelo' : undefined,
      })),
      status: 'open',
      openedAt: new Date(now.getTime() - (idx + 1) * 3600000).toISOString(),
      discount: 0,
      splitCount: 1,
      logs: [{ id: generateId(), action: 'Comanda aberta', timestamp: new Date(now.getTime() - (idx + 1) * 3600000).toISOString() }],
    };
    commands.push(command);
  });
  
  // Closed commands from today (5 closed)
  for (let i = 0; i < 5; i++) {
    const closeTime = new Date(now.getTime() - (i + 1) * 7200000);
    const openTime = new Date(closeTime.getTime() - 5400000);
    const paymentMethods: PaymentMethod[] = ['dinheiro', 'pix', 'credito', 'debito', 'misto'];
    
    const command: Command = {
      id: generateId(),
      tableNumber: String(i + 2),
      clientName: clients[i]?.name || `Cliente ${i + 1}`,
      clientId: clients[i]?.id,
      items: Array(2 + Math.floor(Math.random() * 4)).fill(null).map(() => {
        const item = menuItems[Math.floor(Math.random() * menuItems.length)];
        return {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1 + Math.floor(Math.random() * 2),
        };
      }),
      status: 'closed',
      openedAt: openTime.toISOString(),
      closedAt: closeTime.toISOString(),
      discount: Math.random() > 0.7 ? 10 : 0,
      paymentMethod: paymentMethods[i],
      splitCount: Math.random() > 0.8 ? 2 : 1,
      totalPaid: 0,
      logs: [
        { id: generateId(), action: 'Comanda aberta', timestamp: openTime.toISOString() },
        { id: generateId(), action: 'Comanda fechada', timestamp: closeTime.toISOString() },
      ],
    };
    
    // Calculate total
    const subtotal = command.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discounted = subtotal * (1 - command.discount / 100);
    command.totalPaid = discounted;
    
    commands.push(command);
  }
  
  return commands;
};
