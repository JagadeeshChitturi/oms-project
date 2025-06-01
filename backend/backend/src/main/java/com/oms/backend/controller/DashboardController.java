package com.oms.backend.controller;

import com.oms.backend.model.Order;
import com.oms.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        List<Order> orders = orderRepository.findAll();

        // Total Orders
        int totalOrders = orders.size();

        // Total Revenue
        double totalRevenue = orders.stream()
                .mapToDouble(Order::getPrice)
                .sum();

        // Top Products (by frequency)
        Map<String, Long> productCounts = orders.stream()
                .collect(Collectors.groupingBy(Order::getProduct, Collectors.counting()));

        List<Map<String, Object>> topProducts = productCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(3)
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("product", entry.getKey());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        // Orders per day (for chart)
        Map<LocalDate, Long> ordersPerDay = orders.stream()
                .collect(Collectors.groupingBy(order -> order.getCreatedDate().toLocalDate(), Collectors.counting()));

        List<Map<String, Object>> ordersPerDayList = ordersPerDay.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", entry.getKey().toString());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("totalOrders", totalOrders);
        response.put("totalRevenue", totalRevenue);
        response.put("topProducts", topProducts);
        response.put("ordersPerDay", ordersPerDayList);

        return response;
    }
}
