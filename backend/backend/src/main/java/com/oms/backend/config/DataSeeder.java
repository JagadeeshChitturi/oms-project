package com.oms.backend.config;

import com.oms.backend.model.Order;
import com.oms.backend.repository.OrderRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class DataSeeder {

    @Autowired
    private OrderRepository orderRepository;

    private static final String[] CUSTOMERS = {
            "Alice", "Bob", "Charlie", "Diana", "Ethan"
    };
    private static final String[] PRODUCTS = {
            "Laptop", "Smartphone", "Tablet", "Monitor", "Keyboard"
    };

    @PostConstruct
    public void seedData() {
        if (orderRepository.count() == 0) {
            Random rand = new Random();

            for (int i = 0; i < 50; i++) {
                Order order = new Order();
                order.setCustomerName(CUSTOMERS[rand.nextInt(CUSTOMERS.length)]);
                order.setProduct(PRODUCTS[rand.nextInt(PRODUCTS.length)]);
                order.setQuantity(rand.nextInt(5) + 1);
                order.setPrice((rand.nextInt(500) + 100) * 1.0);
                orderRepository.save(order);
            }

            System.out.println("✅ 50 sample orders inserted.");
        }
    }
}
