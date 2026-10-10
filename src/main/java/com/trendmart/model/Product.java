package com.trendmart.model;
import java.math.BigDecimal;
public class Product {
  private final int id;
  private final String name, category, description, imageUrl;
  private final BigDecimal price;
  private final int stock;
  public Product(int id, String name, String category, String description, BigDecimal price, int stock, String imageUrl) {
    this.id=id; this.name=name; this.category=category; this.description=description;
    this.price=price; this.stock=stock; this.imageUrl=imageUrl;
  }
  public int getId(){return id;}
  public String getName(){return name;}
  public String getCategory(){return category;}
  public String getDescription(){return description;}
  public BigDecimal getPrice(){return price;}
  public int getStock(){return stock;}
  public String getImageUrl(){return imageUrl;}
}