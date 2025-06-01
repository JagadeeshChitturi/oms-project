import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderForm({ refreshOrders, selectedOrder, clearSelection }) {
  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (selectedOrder) {
      setFormData(selectedOrder);
    }
  }, [selectedOrder]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.product || formData.quantity <= 0 || formData.price <= 0) {
      alert("Please fill all fields correctly");
      return;
    }

    if (formData.id) {
      // Edit Mode
      await axios.put(`http://localhost:8080/orders/${formData.id}`, formData);
    } else {
      // Create Mode
      await axios.post('http://localhost:8080/orders', formData);
    }

    setFormData({ customerName: '', product: '', quantity: '', price: '' });
    refreshOrders();
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-3">
        <input
          name="customerName"
          className="form-control"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          name="product"
          className="form-control"
          placeholder="Product"
          value={formData.product}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          name="quantity"
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          name="price"
          type="number"
          className="form-control"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-success w-100">
          {formData.id ? 'Update Order' : 'Add Order'}
        </button>
      </div>
      <div className="card shadow-sm mb-4">
  <div className="card-header bg-primary text-white">
    {selectedOrder ? '✏️ Edit Order' : '➕ Add Order'}
  </div>
  <div className="card-body">
    {/* form fields here */}
  </div>
</div>
<button className="btn btn-custom">Add Order</button>

<div className="card card-custom">
  <div className="card-body">
    <h5 className="card-title">Custom Styled Card</h5>
  </div>
</div>


    </form>
  );
}

export default OrderForm;
