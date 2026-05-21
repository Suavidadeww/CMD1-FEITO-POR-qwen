-- HookahManager Database Schema
-- PostgreSQL for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table (customer information)
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cpf_cnpj TEXT UNIQUE,
    phone TEXT,
    email TEXT,
    points INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    visits INTEGER DEFAULT 0,
    last_visit TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#FF6A00',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2),
    sku TEXT UNIQUE,
    barcode TEXT,
    image_url TEXT,
    preparation_time INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu item costs table (detailed cost breakdown)
CREATE TABLE public.menu_item_costs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    ingredient_name TEXT NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,
    unit TEXT NOT NULL,
    unit_cost DECIMAL(10,4) NOT NULL,
    total_cost DECIMAL(10,4) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    table_number TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled', 'paid')),
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Order items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily history table (daily summaries)
CREATE TABLE public.daily_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    total_discount DECIMAL(10,2) DEFAULT 0,
    total_tax DECIMAL(10,2) DEFAULT 0,
    cancelled_orders INTEGER DEFAULT 0,
    average_ticket DECIMAL(10,2) DEFAULT 0,
    peak_hour INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock movements table
CREATE TABLE public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('entry', 'exit', 'adjustment', 'sale', 'return', 'waste')),
    quantity INTEGER NOT NULL,
    previous_stock INTEGER,
    new_stock INTEGER,
    reason TEXT,
    reference_id UUID,
    reference_type TEXT,
    user_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order logs table (audit trail)
CREATE TABLE public.order_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    previous_status TEXT,
    new_status TEXT,
    user_email TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE public.system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_clients_name ON public.clients(name);
CREATE INDEX idx_clients_phone ON public.clients(phone);
CREATE INDEX idx_clients_active ON public.clients(is_active);
CREATE INDEX idx_categories_name ON public.categories(name);
CREATE INDEX idx_categories_active ON public.categories(is_active);
CREATE INDEX idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX idx_menu_items_name ON public.menu_items(name);
CREATE INDEX idx_menu_items_available ON public.menu_items(is_available);
CREATE INDEX idx_menu_item_costs_item ON public.menu_item_costs(menu_item_id);
CREATE INDEX idx_orders_client ON public.orders(client_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX idx_orders_date ON public.orders(DATE(created_at));
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_menu_item ON public.order_items(menu_item_id);
CREATE INDEX idx_daily_history_date ON public.daily_history(date DESC);
CREATE INDEX idx_stock_movements_item ON public.stock_movements(menu_item_id);
CREATE INDEX idx_stock_movements_type ON public.stock_movements(type);
CREATE INDEX idx_stock_movements_created ON public.stock_movements(created_at DESC);
CREATE INDEX idx_order_logs_order ON public.order_logs(order_id);
CREATE INDEX idx_order_logs_created ON public.order_logs(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read clients"
    ON public.clients FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read categories"
    ON public.categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read menu items"
    ON public.menu_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read menu item costs"
    ON public.menu_item_costs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read orders"
    ON public.orders FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read order items"
    ON public.order_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read daily history"
    ON public.daily_history FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read stock movements"
    ON public.stock_movements FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read order logs"
    ON public.order_logs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read system settings"
    ON public.system_settings FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to manage all tables
CREATE POLICY "Allow authenticated users to manage clients"
    ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage categories"
    ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage menu items"
    ON public.menu_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage menu item costs"
    ON public.menu_item_costs FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage orders"
    ON public.orders FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage order items"
    ON public.order_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage daily history"
    ON public.daily_history FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage stock movements"
    ON public.stock_movements FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage order logs"
    ON public.order_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage system settings"
    ON public.system_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_item_costs_updated_at BEFORE UPDATE ON public.menu_item_costs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_history_updated_at BEFORE UPDATE ON public.daily_history
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
BEGIN
    SELECT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0')
    INTO new_number;
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Function to log order changes
CREATE OR REPLACE FUNCTION public.log_order_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.order_logs (order_id, action, new_status, user_email, created_at)
        VALUES (NEW.id, 'created', NEW.status, current_setting('app.current_user_email', true), NOW());
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status IS DISTINCT FROM NEW.status THEN
            INSERT INTO public.order_logs (order_id, action, previous_status, new_status, user_email, created_at)
            VALUES (NEW.id, 'status_changed', OLD.status, NEW.status, current_setting('app.current_user_email', true), NOW());
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_order_changes
    AFTER INSERT OR UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.log_order_change();
