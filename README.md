# Trend Mart — E-commerce Project

Trend Mart is a responsive storefront prototype built with **HTML, CSS, JavaScript, Java Servlets, JDBC, MySQL, Maven and Apache Tomcat**.

## Live demo with GitHub Pages
1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/docs**, then click **Save**.
4. Wait for GitHub to finish deploying. The site address should be:
   https://joelkatikiro.github.io/Trend-Mart/

The Pages demo uses sample product data because GitHub Pages is a static host and cannot run Java Servlets or MySQL.

## Project structure
- `docs/` — static GitHub Pages storefront.
- `src/main/webapp/` — frontend for the Java web application.
- `src/main/java/` — Java servlet, DAO, product model and database connection.
- `database/schema.sql` — MySQL schema and sample products.
- `pom.xml` — Maven build configuration.
- `docs/PROJECT_REVIEW.md` — project overview and presentation notes.
- `docs/DEMO_STEPS.txt` — short demonstration checklist.

## Run the Java application
1. Install JDK 17+, Maven, MySQL 8+, and Tomcat 10.1+.
2. Execute `database/schema.sql` in MySQL.
3. Configure environment variables `TRENDMART_DB_URL`, `TRENDMART_DB_USER`, and `TRENDMART_DB_PASSWORD`.
4. From the repository root, run `mvn clean package`.
5. Deploy `target/trend-mart.war` to Tomcat.

## Current scope
Product browsing, category filters, search and a browser-side cart prototype are included. Real login, database-backed cart, order creation, checkout and payment processing are **not implemented**.

## Security
Never commit real database credentials or personal customer data.
