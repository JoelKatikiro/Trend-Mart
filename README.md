# Trend Mart — E-commerce Project

Trend Mart is a responsive e-commerce storefront prototype built with HTML, CSS, JavaScript, Java Servlets, JDBC, MySQL, Maven and Apache Tomcat.

## Project contents
- `docs/index.html` — GitHub Pages storefront (static demo)
- `src/main/webapp/` — main frontend for the Java web application
- `src/main/java/` — Java servlet, DAO, model and database connection
- `database/schema.sql` — MySQL schema and sample products
- `pom.xml` — Maven build configuration
- `docs/PROJECT_REVIEW.md` — project overview and presentation notes

## Run the Java application
1. Install JDK 17+, Maven, MySQL 8+, and Tomcat 10.1+.
2. Execute `database/schema.sql` in MySQL.
3. Configure `TRENDMART_DB_URL`, `TRENDMART_DB_USER`, and `TRENDMART_DB_PASSWORD` environment variables.
4. Run `mvn clean package` and deploy `target/trend-mart.war` to Tomcat.

## GitHub Pages demo
The GitHub Pages site is a static storefront demo. GitHub Pages does not run the Java servlet or MySQL backend, so it uses demo product data when the API is unavailable. Cart, login, checkout, order processing, and payments are prototypes/future work, not production features.

## Database safety
Do not commit real database credentials or personal customer data.