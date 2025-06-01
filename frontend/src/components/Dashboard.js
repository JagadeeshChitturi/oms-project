import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    topProducts: [],
    ordersPerDay: [],
  });

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard/summary')
      .then(res => setMetrics(res.data))
      .catch(err => console.error(err));
  }, []);

  const barData = {
    labels: metrics.ordersPerDay.map(d => d.date),
    datasets: [{
      label: 'Orders per Day',
      data: metrics.ordersPerDay.map(d => d.count),
      backgroundColor: '#007bff',
    }],
  };

  const doughnutData = {
    labels: metrics.topProducts.map(p => p.product),
    datasets: [{
      label: 'Top Products',
      data: metrics.topProducts.map(p => p.count),
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
    }],
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📊 Dashboard</h3>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{metrics.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Revenue ($)</h5>
              <p className="card-text fs-4">{metrics.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-custom">Add Order</button>

<div className="card card-custom">
  <div className="card-body">
    <h5 className="card-title">Custom Styled Card</h5>
  </div>
</div>


      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Orders Per Day</h5>
          <Bar data={barData} />
        </div>
        <div className="col-md-6">
          <h5>Top Products</h5>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
