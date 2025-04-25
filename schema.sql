-- Crear la tabla products
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    stock INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    user_id INTEGER
);

-- Crear la tabla cart_items
CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar algunos productos de prueba
INSERT INTO products (title, description, price, stock, image) VALUES
    ('Laptop Gaming', 'Potente laptop para gaming con RTX 3080', 1299.99, 10, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'),
    ('Smartphone Pro', 'Teléfono inteligente de última generación', 899.99, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
    ('Auriculares Wireless', 'Auriculares Bluetooth con cancelación de ruido', 199.99, 20, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
    ('Tablet Ultra', 'Tablet de alta resolución con lápiz digital', 599.99, 8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0'),
    ('Smartwatch Elite', 'Reloj inteligente con monitor cardíaco', 299.99, 12, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12'); 