package com.oms.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders") // 👈 Avoids SQL keyword conflict
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String product;
    private int quantity;
    private double price;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
