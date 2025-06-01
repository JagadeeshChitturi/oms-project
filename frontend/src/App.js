import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Dashboard from './components/Dashboard';
import './sidebar.css'; // ✅ Add this line

function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshOrders = () => setRefreshKey(old => old + 1);
  const clearSelection = () => setSelectedOrder(null);

  const OrderManagementPage = () => (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Order Management System</h2>

      <div className="text-center mb-4">
        <Link to="/dashboard" className="btn btn-info me-2">
          📊 View Dashboard
        </Link>
      </div>

      <OrderForm
        refreshOrders={refreshOrders}
        selectedOrder={selectedOrder}
        clearSelection={clearSelection}
      />
      <OrderList
        key={refreshKey}
        selectOrder={setSelectedOrder}
      />
    </div>
  );

  return (
    <div className="main-layout">
      <div className="sidebar">
        <img src="/images/screen-0.jpg" alt="Left Graphic" style={{ width: '40px'}} />
      </div>

      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<OrderManagementPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>

      <div className="sidebar">
        <img src="/images/screen-0.jpg" alt="Right Graphic" style={{ width: '40px' }} />
      </div>
    </div>
  );
}

export default App;
