CREATE DATABASE IF NOT EXISTS trend_mart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trend_mart;
CREATE TABLE IF NOT EXISTS customers (
 customer_id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL,
 address VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS categories (
 category_id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(80) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS products (
 product_id INT AUTO_INCREMENT PRIMARY KEY, category_id INT NULL,
 product_name VARCHAR(150) NOT NULL, description TEXT,
 price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
 stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
 image_url VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE IF NOT EXISTS orders (
 order_id INT AUTO_INCREMENT PRIMARY KEY, customer_id INT NOT NULL,
 order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 total_amount DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
 status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
 FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
CREATE TABLE IF NOT EXISTS order_items (
 order_item_id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL,
 product_id INT NOT NULL, quantity INT NOT NULL CHECK (quantity > 0),
 unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
 FOREIGN KEY (order_id) REFERENCES orders(order_id),
 FOREIGN KEY (product_id) REFERENCES products(product_id)
);
INSERT IGNORE INTO categories(category_name) VALUES ('Clothing'),('Shoes'),('Accessories'),('Home');
INSERT INTO products(category_id,product_name,description,price,stock_quantity,image_url)
SELECT category_id,'Classic T-Shirt','Soft everyday cotton tee with a clean, versatile fit.',499.00,30,
'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
FROM categories WHERE category_name='Clothing'
AND NOT EXISTS (SELECT 1 FROM products WHERE product_name='Classic T-Shirt');
INSERT INTO products(category_id,product_name,description,price,stock_quantity,image_url)
SELECT category_id,'Urban Sneakers','Comfortable sneakers made for everyday movement.',1499.00,15,
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
FROM categories WHERE category_name='Shoes'
AND NOT EXISTS (SELECT 1 FROM products WHERE product_name='Urban Sneakers');
INSERT INTO products(category_id,product_name,description,price,stock_quantity,image_url)
SELECT category_id,'Everyday Backpack','A practical backpack for work, study, and weekends.',899.00,20,
'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
FROM categories WHERE category_name='Accessories'
AND NOT EXISTS (SELECT 1 FROM products WHERE product_name='Everyday Backpack');
INSERT INTO products(category_id,product_name,description,price,stock_quantity,image_url)
SELECT category_id,'Minimal Wristwatch','A minimal accessory with a timeless look.',1199.00,12,
'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
FROM categories WHERE category_name='Accessories'
AND NOT EXISTS (SELECT 1 FROM products WHERE product_name='Minimal Wristwatch');
SELECT * FROM categories;
SELECT * FROM products;