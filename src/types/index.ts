export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  unit: string;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  costs?: ItemCost[];
}

export interface ItemCost {
  id: string;
  name: string;
  value: number;
}

export interface Client {
  id: string;
  name: string;
  cpf: string;
  whatsapp: string;
  createdAt: string;
  totalVisits: number;
  totalSpent: number;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  observation?: string;
  imageUrl?: string;
}

export interface CommandLog {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface Command {
  id: string;
  tableNumber: string;
  clientId?: string;
  clientName?: string;
  items: CartItem[];
  status: 'open' | 'closed';
  openedAt: string;
  closedAt?: string;
  discount: number;
  paymentMethod?: PaymentMethod;
  splitCount: number;
  totalPaid?: number;
  logs: CommandLog[];
}

export type PaymentMethod = 'dinheiro' | 'pix' | 'credito' | 'debito' | 'misto' | 'fiado';

export interface DailyStats {
  date: string;
  revenue: number;
  profit: number;
  commands: number;
  itemsSold: number;
}

export interface AppData {
  menuItems: MenuItem[];
  clients: Client[];
  commands: Command[];
  dailyStats: DailyStats[];
  theme: 'light' | 'dark';
}
