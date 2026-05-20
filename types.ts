export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Traditional" | "Smart";
  type: "Ring" | "Necklace" | "Bracelet" | "Pendant" | "Bangle";
  image: string;
  features?: string[];
  isNew?: boolean;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  total: number;
  items: CartItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  ordersCount: number;
}

export interface CustomizationRequest {
  id: string;
  customerName: string;
  email: string;
  requestDetails: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export interface AdminUser {
  name: string;
  email: string;
}
