package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private String email;
    private String orderDetails;

    public Customer() {}
    public Customer(String name, int age, String email, String orderDetails) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.orderDetails = orderDetails;
    }

    // Getters & setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    public String getOrderDetails() { return orderDetails; }

    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setEmail(String email) { this.email = email; }
    public void setOrderDetails(String orderDetails) { this.orderDetails = orderDetails; }
}
