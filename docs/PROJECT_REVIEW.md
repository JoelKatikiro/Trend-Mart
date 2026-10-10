# Trend Mart — Project Review

## Overview
**Project:** Trend Mart — E-commerce Online Platform  
**Stack:** HTML, CSS, JavaScript, Java Servlets, JDBC, MySQL, Maven, Apache Tomcat.

Trend Mart is a responsive online storefront prototype. Visitors can browse products, search/filter categories, add products to a cart, adjust quantities and see a subtotal.

## Objectives
1. Build a responsive storefront.
2. Organize products by category and support search/filter.
3. Design a relational database for customers, products, categories, orders and order items.
4. Connect Java server-side code to MySQL using JDBC.
5. Retrieve product records through a Java Servlet API.
6. Demonstrate cart interactions and prepare a foundation for checkout.

## Architecture
Browser (HTML/CSS/JS) -> HTTP GET /api/products -> ProductServlet -> ProductDAO -> DBConnection/JDBC -> MySQL -> JSON response -> JavaScript renders product cards.

## Database design
- customers(customer_id PK, full_name, email UNIQUE, password_hash, address, created_at)
- categories(category_id PK, category_name UNIQUE)
- products(product_id PK, category_id FK, product_name, description, price, stock_quantity, image_url, created_at)
- orders(order_id PK, customer_id FK, order_date, total_amount, status)
- order_items(order_item_id PK, order_id FK, product_id FK, quantity, unit_price)

One category has many products; one customer has many orders; one order has many order items; products and orders have a many-to-many relationship resolved by order_items.

## Connectivity
Configure TRENDMART_DB_URL, TRENDMART_DB_USER, and TRENDMART_DB_PASSWORD as environment variables. ProductServlet calls ProductDAO, which runs a SELECT with a LEFT JOIN and returns JSON.

## UI/UX principles
- Visual hierarchy through a prominent hero heading and clear section headings.
- Consistency through repeated spacing, colors, buttons and product-card layout.
- Responsiveness through CSS Grid, flexible containers and media queries.
- Feedback through cart count, add-to-cart message, subtotal and empty-search state.
- Accessibility basics through semantic sections, form labels, button names, alt text and reduced-motion support.

## Limitations and future work
The cart uses browser localStorage. Checkout does not create orders and no payment is processed. User login is not implemented. Customer authentication, database-backed cart, order creation, inventory transactions, payment gateway and admin dashboard are future work.

## Suggested group split
1. UI design and responsive CSS.
2. JavaScript search, filters and cart prototype.
3. Java Servlets, JDBC and API integration.
4. Database schema, testing, documentation and presentation.

## Presentation script
“Good morning. Our project is Trend Mart, an e-commerce platform prototype designed to make product discovery convenient through a responsive online storefront. We use HTML, CSS and JavaScript for the interface, Java Servlets for backend requests, JDBC for database connectivity, and MySQL for relational data storage. Our database includes customers, categories, products, orders and order items. The interface demonstrates product search, category filtering and a browser-based shopping cart. This review focuses on the project structure, database design, database connectivity and responsive UI. Customer authentication, real checkout and payment processing are planned future enhancements.”

## GitHub Pages note
The static demo is under docs/. GitHub Pages can publish HTML/CSS/JavaScript but does not execute Java Servlets or MySQL. The static site therefore uses demo products; deploy the Java WAR separately for backend/API functionality.