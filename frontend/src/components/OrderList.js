import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList({ selectOrder }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);


  const loadOrders = async (page = 0) => {
  try {
    const response = await axios.get(`http://localhost:8080/orders/paginated?page=${page}&size=10`);
    setOrders(response.data.content);
    setTotalPages(response.data.totalPages);
    setCurrentPage(page);
  } catch (err) {
    console.error("Pagination failed:", err);
  }
};

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/orders/${id}`);
    loadOrders();
  };
  const handleSearch = async (query) => {
  if (query.trim() === "") {
    loadOrders(); // Reset to all orders
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/orders/search?query=${query}`);
    setOrders(response.data);
  } catch (err) {
    console.error("Search failed:", err);
  }
};


  return (
    <div>
      <h4 className="mb-3">Order List</h4>
      <input
  type="text"
  className="form-control mb-3"
  placeholder="Search by customer or product..."
  onChange={(e) => handleSearch(e.target.value)}
/>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No orders found</td></tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => selectOrder(order)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
  <button
    className="btn btn-outline-primary"
    onClick={() => loadOrders(currentPage - 1)}
    disabled={currentPage === 0}
  >
    ◀ Previous
  </button>
  <span>Page {currentPage + 1} of {totalPages}</span>
  <button
    className="btn btn-outline-primary"
    onClick={() => loadOrders(currentPage + 1)}
    disabled={currentPage + 1 >= totalPages}
  >
    Next ▶
  </button>
</div>

    </div>
  );
}

export default OrderList;
