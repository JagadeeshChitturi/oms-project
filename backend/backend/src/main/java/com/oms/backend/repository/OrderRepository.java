package com.oms.backend.repository;

import com.oms.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 🔍 Add this method for filtering by customer name or product (case-insensitive)
    List<Order> findByCustomerNameContainingIgnoreCaseOrProductContainingIgnoreCase(String customer, String product);
}
