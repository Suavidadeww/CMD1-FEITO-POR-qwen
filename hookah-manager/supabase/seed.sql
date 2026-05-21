-- HookahManager Seed Data
-- Sample data for demonstration

-- Insert sample categories
INSERT INTO public.categories (name, description, icon, color, sort_order) VALUES
    ('Narguilés', 'Narguilés e acessórios', 'cylinder-smoke', '#FF6A00', 1),
    ('Essências', 'Sabores e essências para narguilé', 'flask-conical', '#F97316', 2),
    ('Carvões', 'Carvões naturais e rápidos', 'fire', '#EA580C', 3),
    ('Bebidas', 'Bebidas alcoólicas e não alcoólicas', 'wine-bottle', '#DC2626', 4),
    ('Lanches', 'Porções e lanches', 'sandwich', '#EAB308', 5),
    ('Acessórios', 'Piteiras, alumínio e acessórios', 'sparkles', '#0EA5E9', 6);

-- Insert sample clients
INSERT INTO public.clients (name, cpf_cnpj, phone, email, points, total_spent, visits, notes) VALUES
    ('João Silva', '123.456.789-00', '(11) 91111-1111', 'joao@email.com', 150, 450.00, 12, 'Cliente frequente'),
    ('Maria Santos', '234.567.890-11', '(11) 92222-2222', 'maria@email.com', 280, 820.00, 18, 'Prefere mesa VIP'),
    ('Pedro Costa', '345.678.901-22', '(11) 93333-3333', 'pedro@email.com', 90, 280.00, 8, NULL),
    ('Ana Oliveira', '456.789.012-33', '(11) 94444-4444', 'ana@email.com', 420, 1250.00, 25, 'Melhor cliente'),
    ('Carlos Ferreira', '567.890.123-44', '(11) 95555-5555', 'carlos@email.com', 60, 180.00, 5, NULL);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name, description, price, cost, sku, preparation_time, is_featured, sort_order) VALUES
    ((SELECT id FROM categories WHERE name = 'Narguilés'), 'Narguilé Tradicional', 'Narguilé tamanho médio com piteira longa', 45.00, 20.00, 'NG-001', 5, true, 1),
    ((SELECT id FROM categories WHERE name = 'Narguilés'), 'Narguilé Premium', 'Narguilé grande com acabamento em vidro', 65.00, 30.00, 'NG-002', 5, true, 2),
    ((SELECT id FROM categories WHERE name = 'Narguilés'), 'Narguilé Small', 'Narguilé pequeno para 1-2 pessoas', 30.00, 15.00, 'NG-003', 3, false, 3),
    ((SELECT id FROM categories WHERE name = 'Essências'), 'Blueberry Mist', 'Sabor de mirtilo refrescante - 100g', 25.00, 12.00, 'ES-001', 0, true, 1),
    ((SELECT id FROM categories WHERE name = 'Essências'), 'Grape Ice', 'Uva gelada intensa - 100g', 25.00, 12.00, 'ES-002', 0, true, 2),
    ((SELECT id FROM categories WHERE name = 'Essências'), 'Love 66', 'Melancia com frutas tropicais - 100g', 28.00, 14.00, 'ES-003', 0, true, 3),
    ((SELECT id FROM categories WHERE name = 'Essências'), 'Hawaii Blue', 'Abacaxi com hortelã - 100g', 25.00, 12.00, 'ES-004', 0, false, 4),
    ((SELECT id FROM categories WHERE name = 'Carvões'), 'Carvão Natural 1kg', 'Carvão natural de coco - 1kg', 18.00, 8.00, 'CR-001', 0, false, 1),
    ((SELECT id FROM categories WHERE name = 'Carvões'), 'Carvão Rápido 40g', 'Carvão rápido em cubos - 40g', 5.00, 2.00, 'CR-002', 0, false, 2),
    ((SELECT id FROM categories WHERE name = 'Bebidas'), 'Coca-Cola 350ml', 'Refrigerante lata', 8.00, 3.50, 'BB-001', 0, false, 1),
    ((SELECT id FROM categories WHERE name = 'Bebidas'), 'Heineken 600ml', 'Cerveja long neck', 15.00, 7.00, 'BB-002', 0, true, 2),
    ((SELECT id FROM categories WHERE name = 'Bebidas'), 'Suco de Laranja', 'Suco natural 500ml', 12.00, 5.00, 'BB-003', 0, false, 3),
    ((SELECT id FROM categories WHERE name = 'Bebidas'), 'Água Mineral', 'Água sem gás 500ml', 5.00, 2.00, 'BB-004', 0, false, 4),
    ((SELECT id FROM categories WHERE name = 'Lanches'), 'Batata Frita', 'Porção de batata frita com cheddar e bacon', 35.00, 15.00, 'LN-001', 15, true, 1),
    ((SELECT id FROM categories WHERE name = 'Lanches'), 'Isca de Frango', 'Porção de isca de frango crocante', 40.00, 18.00, 'LN-002', 15, true, 2),
    ((SELECT id FROM categories WHERE name = 'Lanches'), 'Dadinho de Tapioca', 'Porção com molho de pimenta', 28.00, 12.00, 'LN-003', 10, false, 3),
    ((SELECT id FROM categories WHERE name = 'Acessórios'), 'Piteira Descartável', 'Pacote com 10 unidades', 3.00, 1.00, 'AC-001', 0, false, 1),
    ((SELECT id FROM categories WHERE name = 'Acessórios'), 'Papel Alumínio', 'Rolo profissional 30cm', 12.00, 5.00, 'AC-002', 0, false, 2),
    ((SELECT id FROM categories WHERE name = 'Acessórios'), 'Pinça de Carvão', 'Pinça metálica resistente', 15.00, 7.00, 'AC-003', 0, false, 3);

-- Insert sample menu item costs
INSERT INTO public.menu_item_costs (menu_item_id, ingredient_name, quantity, unit, unit_cost, total_cost) VALUES
    ((SELECT id FROM menu_items WHERE sku = 'NG-001'), 'Tabaco', 20, 'g', 0.50, 10.00),
    ((SELECT id FROM menu_items WHERE sku = 'NG-001'), 'Carvão', 4, 'un', 0.50, 2.00),
    ((SELECT id FROM menu_items WHERE sku = 'NG-001'), 'Piteira', 1, 'un', 1.00, 1.00),
    ((SELECT id FROM menu_items WHERE sku = 'NG-001'), 'Mão de obra', 5, 'min', 1.40, 7.00),
    ((SELECT id FROM menu_items WHERE sku = 'LN-001'), 'Batata', 300, 'g', 0.02, 6.00),
    ((SELECT id FROM menu_items WHERE sku = 'LN-001'), 'Cheddar', 50, 'g', 0.08, 4.00),
    ((SELECT id FROM menu_items WHERE sku = 'LN-001'), 'Bacon', 30, 'g', 0.10, 3.00),
    ((SELECT id FROM menu_items WHERE sku = 'LN-001'), 'Óleo', 20, 'ml', 0.05, 1.00),
    ((SELECT id FROM menu_items WHERE sku = 'LN-001'), 'Mão de obra', 15, 'min', 0.07, 1.00);

-- Insert sample system settings
INSERT INTO public.system_settings (key, value, description) VALUES
    ('business_info', '{"name": "Hookah Lounge", "cnpj": "00.000.000/0001-00", "address": "Rua Exemplo, 123", "phone": "(11) 99999-9999"}', 'Informações do estabelecimento'),
    ('tax_rate', '{"rate": 0.10}', 'Taxa de serviço padrão'),
    ('loyalty_enabled', '{"enabled": true}', 'Programa de fidelidade ativo'),
    ('theme', '{"primary_color": "#FF6A00", "dark_mode": true}', 'Configurações de tema');

-- Insert sample stock movements
INSERT INTO public.stock_movements (menu_item_id, type, quantity, previous_stock, new_stock, reason, user_email) VALUES
    ((SELECT id FROM menu_items WHERE sku = 'ES-001'), 'entry', 50, 0, 50, 'Compra inicial', 'admin@hookahmanager.com'),
    ((SELECT id FROM menu_items WHERE sku = 'ES-002'), 'entry', 50, 0, 50, 'Compra inicial', 'admin@hookahmanager.com'),
    ((SELECT id FROM menu_items WHERE sku = 'ES-003'), 'entry', 50, 0, 50, 'Compra inicial', 'admin@hookahmanager.com'),
    ((SELECT id FROM menu_items WHERE sku = 'CR-001'), 'entry', 100, 0, 100, 'Compra inicial', 'admin@hookahmanager.com'),
    ((SELECT id FROM menu_items WHERE sku = 'CR-002'), 'entry', 200, 0, 200, 'Compra inicial', 'admin@hookahmanager.com');

-- Insert sample orders
INSERT INTO public.orders (order_number, client_id, table_number, status, subtotal, discount, tax, total, payment_method, payment_status, notes) VALUES
    ('ORD-20250101-1001', (SELECT id FROM clients WHERE name = 'João Silva'), 'Mesa 1', 'paid', 78.00, 0, 7.80, 85.80, 'credit_card', 'paid', 'Cliente preferencial'),
    ('ORD-20250101-1002', (SELECT id FROM clients WHERE name = 'Maria Santos'), 'Mesa 3', 'paid', 120.00, 10, 11.00, 121.00, 'pix', 'paid', NULL),
    ('ORD-20250101-1003', (SELECT id FROM clients WHERE name = 'Pedro Costa'), 'Mesa 5', 'delivered', 58.00, 0, 5.80, 63.80, 'cash', 'paid', NULL);

-- Insert sample order items
INSERT INTO public.order_items (order_id, menu_item_id, quantity, unit_price, subtotal, notes) VALUES
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), (SELECT id FROM menu_items WHERE sku = 'NG-001'), 1, 45.00, 45.00, 'Sem gelo'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), (SELECT id FROM menu_items WHERE sku = 'BB-001'), 2, 8.00, 16.00, NULL),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), (SELECT id FROM menu_items WHERE sku = 'LN-001'), 1, 35.00, 35.00, 'Extra bacon'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1002'), (SELECT id FROM menu_items WHERE sku = 'NG-002'), 2, 65.00, 130.00, 'Sabores diferentes'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1003'), (SELECT id FROM menu_items WHERE sku = 'NG-003'), 1, 30.00, 30.00, NULL),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1003'), (SELECT id FROM menu_items WHERE sku = 'BB-002'), 2, 15.00, 30.00, NULL);

-- Insert sample daily history
INSERT INTO public.daily_history (date, total_orders, total_revenue, total_discount, total_tax, cancelled_orders, average_ticket, peak_hour, notes) VALUES
    ('2025-01-01', 3, 256.00, 10.00, 24.60, 0, 85.33, 21, 'Dia movimentado'),
    ('2025-01-02', 0, 0, 0, 0, 0, 0, NULL, NULL);

-- Insert sample order logs
INSERT INTO public.order_logs (order_id, action, previous_status, new_status, user_email, notes) VALUES
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), 'created', NULL, 'pending', 'admin@hookahmanager.com', 'Pedido criado'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), 'status_changed', 'pending', 'preparing', 'admin@hookahmanager.com', 'Iniciando preparo'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), 'status_changed', 'preparing', 'ready', 'admin@hookahmanager.com', 'Pedido pronto'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), 'status_changed', 'ready', 'delivered', 'admin@hookahmanager.com', 'Entregue ao cliente'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-20250101-1001'), 'status_changed', 'delivered', 'paid', 'admin@hookahmanager.com', 'Pagamento confirmado');
