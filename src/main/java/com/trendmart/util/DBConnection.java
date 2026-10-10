package com.trendmart.util;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public final class DBConnection {
  private DBConnection() {}
  private static String env(String key, String fallback) {
    String value = System.getenv(key);
    return value == null || value.isBlank() ? fallback : value;
  }
  private static final String URL = env("TRENDMART_DB_URL",
    "jdbc:mysql://localhost:3306/trend_mart?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC");
  private static final String USER = env("TRENDMART_DB_USER", "root");
  private static final String PASSWORD = env("TRENDMART_DB_PASSWORD", "");
  public static Connection getConnection() throws SQLException {
    return DriverManager.getConnection(URL, USER, PASSWORD);
  }
}