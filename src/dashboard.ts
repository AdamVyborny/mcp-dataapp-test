export function renderDashboard(): string {
  const monthlyRevenue = [
    { month: "Jan", revenue: 42000, orders: 320 },
    { month: "Feb", revenue: 38500, orders: 285 },
    { month: "Mar", revenue: 51200, orders: 410 },
    { month: "Apr", revenue: 47800, orders: 375 },
    { month: "May", revenue: 55300, orders: 445 },
    { month: "Jun", revenue: 61000, orders: 502 },
    { month: "Jul", revenue: 58700, orders: 478 },
    { month: "Aug", revenue: 64200, orders: 530 },
    { month: "Sep", revenue: 59800, orders: 490 },
    { month: "Oct", revenue: 67500, orders: 558 },
    { month: "Nov", revenue: 72100, orders: 612 },
    { month: "Dec", revenue: 78400, orders: 670 },
  ];

  const categories = [
    { name: "Electronics", value: 35 },
    { name: "Clothing", value: 25 },
    { name: "Home & Garden", value: 18 },
    { name: "Sports", value: 12 },
    { name: "Books", value: 10 },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 1240, revenue: 86800 },
    { name: "Running Shoes", sales: 980, revenue: 73500 },
    { name: "Smart Watch", sales: 870, revenue: 130500 },
    { name: "Yoga Mat", sales: 760, revenue: 22800 },
    { name: "Coffee Maker", sales: 650, revenue: 48750 },
  ];

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = monthlyRevenue.reduce((sum, m) => sum + m.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sales Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      min-height: 100vh;
    }

    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-bottom: 1px solid #334155;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header h1 {
      font-size: 22px;
      font-weight: 600;
      color: #f1f5f9;
    }

    .header .subtitle {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 2px;
    }

    .header .badge {
      background: #1d4ed8;
      color: #fff;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 500;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 32px;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .kpi-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }

    .kpi-card .label {
      font-size: 13px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .kpi-card .value {
      font-size: 28px;
      font-weight: 700;
      color: #f1f5f9;
    }

    .kpi-card .change {
      font-size: 13px;
      margin-top: 6px;
    }

    .change.positive { color: #4ade80; }
    .change.negative { color: #f87171; }

    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }

    .card h2 {
      font-size: 16px;
      font-weight: 600;
      color: #f1f5f9;
      margin-bottom: 16px;
    }

    .chart-container {
      position: relative;
      height: 280px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 10px 12px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
      border-bottom: 1px solid #334155;
    }

    td {
      padding: 12px;
      font-size: 14px;
      border-bottom: 1px solid #1e293b;
    }

    tr:hover td {
      background: #1e293b;
    }

    .rank {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      background: #334155;
      color: #94a3b8;
    }

    .rank.top { background: #1d4ed8; color: #fff; }

    @media (max-width: 768px) {
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
      .charts-grid { grid-template-columns: 1fr; }
      .container { padding: 16px; }
    }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <h1>Sales Dashboard</h1>
      <div class="subtitle">Dummy data for demonstration purposes</div>
    </div>
    <div class="badge">Live Demo</div>
  </div>

  <div class="container">
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="label">Total Revenue</div>
        <div class="value">$${(totalRevenue / 1000).toFixed(0)}K</div>
        <div class="change positive">+12.5% vs last year</div>
      </div>
      <div class="kpi-card">
        <div class="label">Total Orders</div>
        <div class="value">${totalOrders.toLocaleString()}</div>
        <div class="change positive">+8.3% vs last year</div>
      </div>
      <div class="kpi-card">
        <div class="label">Avg Order Value</div>
        <div class="value">$${avgOrderValue}</div>
        <div class="change positive">+3.8% vs last year</div>
      </div>
      <div class="kpi-card">
        <div class="label">Customers</div>
        <div class="value">3,842</div>
        <div class="change positive">+15.2% vs last year</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="card">
        <h2>Monthly Revenue & Orders</h2>
        <div class="chart-container">
          <canvas id="revenueChart"></canvas>
        </div>
      </div>
      <div class="card">
        <h2>Sales by Category</h2>
        <div class="chart-container">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Top Products</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          ${topProducts
            .map(
              (p, i) => `
            <tr>
              <td><span class="rank ${i < 3 ? "top" : ""}">${i + 1}</span></td>
              <td>${p.name}</td>
              <td>${p.sales.toLocaleString()}</td>
              <td>$${p.revenue.toLocaleString()}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    const months = ${JSON.stringify(monthlyRevenue.map((m) => m.month))};
    const revenues = ${JSON.stringify(monthlyRevenue.map((m) => m.revenue))};
    const orders = ${JSON.stringify(monthlyRevenue.map((m) => m.orders))};

    new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue ($)',
            data: revenues,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 4,
            yAxisID: 'y',
            order: 2
          },
          {
            label: 'Orders',
            data: orders,
            type: 'line',
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#4ade80',
            fill: true,
            yAxisID: 'y1',
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { labels: { color: '#94a3b8', usePointStyle: true, padding: 16 } }
        },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
          y: {
            position: 'left',
            ticks: { color: '#64748b', callback: v => '$' + v / 1000 + 'K' },
            grid: { color: '#1e293b' }
          },
          y1: {
            position: 'right',
            ticks: { color: '#64748b' },
            grid: { display: false }
          }
        }
      }
    });

    const catNames = ${JSON.stringify(categories.map((c) => c.name))};
    const catValues = ${JSON.stringify(categories.map((c) => c.value))};

    new Chart(document.getElementById('categoryChart'), {
      type: 'doughnut',
      data: {
        labels: catNames,
        datasets: [{
          data: catValues,
          backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'],
          borderColor: '#1e293b',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', usePointStyle: true, padding: 12, font: { size: 12 } }
          }
        }
      }
    });
  </script>

</body>
</html>`;
}
