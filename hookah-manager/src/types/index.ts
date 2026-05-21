export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  stock_quantity: number;
  min_stock: number;
  image_url?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Table {
  id: string;
  name: string;
  number?: string;
  capacity: number;
  location?: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  table_id?: string;
  user_id?: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled' | 'paid';
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  payment_method?: string;
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  table?: Table;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  notes?: string;
  created_at: string;
  product?: Product;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  points: number;
  total_spent: number;
  visits: number;
  last_visit?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  user_id?: string;
  type: 'entry' | 'exit' | 'adjustment' | 'sale' | 'return';
  quantity: number;
  previous_stock?: number;
  new_stock?: number;
  reason?: string;
  reference_id?: string;
  reference_type?: string;
  created_at: string;
  product?: Product;
}

export interface Settings {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  todayRevenue: number;
  monthlyRevenue: number;
  lowStockProducts: number;
  activeTables: number;
}
