export interface Product {
  sku: number;
  name: string;
  description: string;
  price: number;
  basketLimit: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface UpdateQuantityPayload {
  sku: number;
  quantity: number;
}
