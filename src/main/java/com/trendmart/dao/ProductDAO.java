package com.trendmart.dao;
import com.trendmart.model.Product;
import com.trendmart.util.DBConnection;
import java.sql.*;
import java.util.*;
public class ProductDAO {
  public List<Product> findAll() throws SQLException {
    String sql = "SELECT p.product_id,p.product_name,c.category_name,p.description,p.price,p.stock_quantity,p.image_url " +
      "FROM products p LEFT JOIN categories c ON p.category_id=c.category_id ORDER BY p.product_id";
    List<Product> list = new ArrayList<>();
    try (Connection con=DBConnection.getConnection();
         PreparedStatement ps=con.prepareStatement(sql);
         ResultSet rs=ps.executeQuery()) {
      while(rs.next()) list.add(new Product(rs.getInt("product_id"),rs.getString("product_name"),
        rs.getString("category_name"),rs.getString("description"),rs.getBigDecimal("price"),
        rs.getInt("stock_quantity"),rs.getString("image_url")));
    }
    return list;
  }
}