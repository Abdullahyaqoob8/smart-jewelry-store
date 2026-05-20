-- Smart Jewelry Store Database Schema

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT,
    stock INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    feature TEXT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_id TEXT,
    total REAL NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_time REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS customization_requests (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    request_details TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS global_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Insert demo admin user
INSERT OR IGNORE INTO users (id, name, email, role, password_hash) 
VALUES ('usr_admin1', 'ABDULLAH', 'abdullah@smartjewelry.com', 'super_admin', '$2a$10$xyz...');

-- Insert initial products
INSERT OR IGNORE INTO products (id, name, description, price, category, type, image, stock, is_new)
VALUES 
('PROD-1', 'Aura Smart Ring', 'Premium titanium smart ring with 24/7 health tracking.', 299, 'Smart', 'Ring', 'https://images.unsplash.com/photo-1596943799639-61da1296abaf?q=80&w=800&auto=format&fit=crop', 42, 1),
('PROD-2', 'Eternity Diamond', '18k gold engagement ring with flawless 2 carat diamond.', 2499, 'Traditional', 'Ring', 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop', 3, 0);

INSERT OR IGNORE INTO product_features (product_id, feature)
VALUES 
('PROD-1', 'Heart rate monitoring'),
('PROD-1', 'Sleep analysis'),
('PROD-1', 'Step tracking');
