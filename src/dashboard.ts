import { monthlySales, productCategories, kpis, topProducts } from "./data";

function kpiCard(kpi: { label: string; value: string; change: string; positive: boolean }): string {
  const arrow = kpi.positive ? "&#9650;" : "&#9660;";
  const color = kpi.positive ? "#10b981" : "#ef4444";
  return `
    <div class="kpi-card">
      <div class="kpi-label">${kpi.label}</div>
      <div class="kpi-value">${kpi.value}</div>
      <div class="kpi-change" style="color: ${color}">${arrow} ${kpi.change} vs last year</div>
    </div>`;
}

function topProductsTable(): string {
  const rows = topProducts
    .map(
      (p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td><span class="badge">${p.category}</span></td>
      <td>${p.sold.toLocaleString()}</td>
      <td>${p.revenue}</td>
    </tr>`
    )
    .join("");

  return `
    <table>
      <thead>
        <tr><th>#</th><th>Product</th><th>Category</th><th>Units Sold</th><th>Revenue</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

export function dashboard(): string {
  const monthLabels = JSON.stringify(monthlySales.map((m) => m.month));
  const revenueData = JSON.stringify(monthlySales.map((m) => m.revenue));
  const ordersData = JSON.stringify(monthlySales.map((m) => m.orders));
  const customersData = JSON.stringify(monthlySales.map((m) => m.customers));
  const catLabels = JSON.stringify(productCategories.map((c) => c.name));
  const catData = JSON.stringify(productCategories.map((c) => c.revenue));
  const catColors = JSON.stringify(productCategories.map((c) => c.color));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sales Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f1f5f9;
      color: #1e293b;
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .header h1 { font-size: 1.75rem; font-weight: 700; }
    .header .subtitle { color: #64748b; font-size: 0.875rem; }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .kpi-card {
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .kpi-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .kpi-value { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.25rem; }
    .kpi-change { font-size: 0.8rem; font-weight: 500; }
    .charts-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .card h2 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #334155; }
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th { text-align: left; padding: 0.75rem; border-bottom: 2px solid #e2e8f0; color: #64748b; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
    td { padding: 0.75rem; border-bottom: 1px solid #f1f5f9; }
    tr:hover td { background: #f8fafc; }
    .badge {
      background: #ede9fe;
      color: #7c3aed;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .bottom-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 768px) {
      body { padding: 1rem; }
      .charts-row, .bottom-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>Sales Dashboard</h1>
      <div class="subtitle">Annual performance overview &mdash; example data</div>
    </div>
    <div class="subtitle">Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  </div>

  <div class="kpi-grid">
    ${kpis.map(kpiCard).join("")}
  </div>

  <div class="charts-row">
    <div class="card">
      <h2>Monthly Revenue</h2>
      <canvas id="revenueChart"></canvas>
    </div>
    <div class="card">
      <h2>Revenue by Category</h2>
      <canvas id="categoryChart"></canvas>
    </div>
  </div>

  <div class="bottom-row">
    <div class="card">
      <h2>Orders &amp; Customers</h2>
      <canvas id="ordersChart"></canvas>
    </div>
    <div class="card">
      <h2>Top Products</h2>
      ${topProductsTable()}
    </div>
  </div>

  <script>
    const months = ${monthLabels};
    const revenue = ${revenueData};
    const orders = ${ordersData};
    const customers = ${customersData};

    new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue ($)',
          data: revenue,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          barPercentage: 0.6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '$' + (v/1000) + 'k' } }
        }
      }
    });

    new Chart(document.getElementById('categoryChart'), {
      type: 'doughnut',
      data: {
        labels: ${catLabels},
        datasets: [{
          data: ${catData},
          backgroundColor: ${catColors},
          borderWidth: 0,
          spacing: 2
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } }
        }
      }
    });

    new Chart(document.getElementById('ordersChart'), {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          { label: 'Orders', data: orders, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)', fill: true, tension: 0.4 },
          { label: 'New Customers', data: customers, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', fill: true, tension: 0.4 }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } } },
        scales: { y: { beginAtZero: true } }
      }
    });
  </script>
</body>
</html>`;
}
