package com.oms.backend.controller;

import com.oms.backend.model.Order;
import com.oms.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setCustomerName(orderDetails.getCustomerName());
            order.setProduct(orderDetails.getProduct());
            order.setQuantity(orderDetails.getQuantity());
            order.setPrice(orderDetails.getPrice());
            return orderRepository.save(order);
        }
        return null;
    }
    @GetMapping("/search")
    public List<Order> searchOrders(@RequestParam String query) {
        return orderRepository.findByCustomerNameContainingIgnoreCaseOrProductContainingIgnoreCase(query, query);
    }
    @GetMapping("/paginated")
    public Page<Order> getPaginatedOrders(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findAll(pageable);
    }


    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return "Order deleted with id: " + id;
    }
}