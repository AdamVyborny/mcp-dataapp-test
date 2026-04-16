export interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface ProductCategory {
  name: string;
  revenue: number;
  color: string;
}

export interface KPI {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export const monthlySales: MonthlySales[] = [
  { month: "Jan", revenue: 42000, orders: 320, customers: 210 },
  { month: "Feb", revenue: 38500, orders: 290, customers: 195 },
  { month: "Mar", revenue: 51200, orders: 410, customers: 275 },
  { month: "Apr", revenue: 47800, orders: 375, customers: 250 },
  { month: "May", revenue: 53600, orders: 430, customers: 290 },
  { month: "Jun", revenue: 49100, orders: 395, customers: 265 },
  { month: "Jul", revenue: 55800, orders: 450, customers: 310 },
  { month: "Aug", revenue: 58200, orders: 470, customers: 325 },
  { month: "Sep", revenue: 52400, orders: 420, customers: 285 },
  { month: "Oct", revenue: 61000, orders: 490, customers: 340 },
  { month: "Nov", revenue: 67500, orders: 540, customers: 375 },
  { month: "Dec", revenue: 72300, orders: 580, customers: 410 },
];

export const productCategories: ProductCategory[] = [
  { name: "Electronics", revenue: 245000, color: "#3b82f6" },
  { name: "Clothing", revenue: 189000, color: "#8b5cf6" },
  { name: "Home & Garden", revenue: 134000, color: "#06b6d4" },
  { name: "Sports", revenue: 98000, color: "#10b981" },
  { name: "Books", revenue: 43400, color: "#f59e0b" },
];

export const kpis: KPI[] = [
  { label: "Total Revenue", value: "$648,400", change: "+12.5%", positive: true },
  { label: "Total Orders", value: "5,170", change: "+8.3%", positive: true },
  { label: "Avg Order Value", value: "$125.42", change: "+3.8%", positive: true },
  { label: "New Customers", value: "3,530", change: "-2.1%", positive: false },
  { label: "Conversion Rate", value: "3.24%", change: "+0.5%", positive: true },
  { label: "Customer Retention", value: "68.7%", change: "+4.2%", positive: true },
];

export const topProducts = [
  { name: 'Wireless Headphones Pro', category: 'Electronics', sold: 1240, revenue: '$86,800' },
  { name: 'Running Shoes X1', category: 'Sports', sold: 890, revenue: '$71,200' },
  { name: 'Smart Watch Ultra', category: 'Electronics', sold: 760, revenue: '$60,800' },
  { name: 'Cotton T-Shirt Pack', category: 'Clothing', sold: 2100, revenue: '$52,500' },
  { name: 'Garden Tool Set', category: 'Home & Garden', sold: 620, revenue: '$43,400' },
];
