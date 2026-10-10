package com.trendmart.controller;
import com.trendmart.dao.ProductDAO;
import com.trendmart.model.Product;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.List;
@WebServlet("/api/products")
public class ProductServlet extends HttpServlet {
  private final ProductDAO dao = new ProductDAO();
  @Override protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    resp.setContentType("application/json"); resp.setCharacterEncoding("UTF-8");
    try {
      List<Product> products=dao.findAll(); StringBuilder out=new StringBuilder("[");
      for(int i=0;i<products.size();i++) {
        Product p=products.get(i); if(i>0) out.append(",");
        out.append("{").append("\"id\":").append(p.getId()).append(",")
          .append("\"name\":").append(quote(p.getName())).append(",")
          .append("\"category\":").append(quote(p.getCategory())).append(",")
          .append("\"description\":").append(quote(p.getDescription())).append(",")
          .append("\"price\":").append(p.getPrice().toPlainString()).append(",")
          .append("\"stock\":").append(p.getStock()).append(",")
          .append("\"image\":").append(quote(p.getImageUrl())).append("}");
      }
      resp.getWriter().write(out.append("]").toString());
    } catch(Exception e) {
      getServletContext().log("Trend Mart product API failed",e); resp.setStatus(500);
      resp.getWriter().write("{\"error\":\"Unable to load products. Check database configuration.\"}");
    }
  }
  private static String quote(String s) {
    if(s==null) return "null"; StringBuilder b=new StringBuilder("\"");
    for(char c:s.toCharArray()) switch(c) {
      case '"' -> b.append("\\\""); case '\\' -> b.append("\\\\");
      case '\n' -> b.append("\\n"); case '\r' -> b.append("\\r"); case '\t' -> b.append("\\t");
      default -> { if(c<0x20) b.append(String.format("\\u%04x",(int)c)); else b.append(c); }
    }
    return b.append('"').toString();
  }
}