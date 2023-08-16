export interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    password: string;
    id: number;
    role: number;
    orders: Order[] | [];
    cart: OrderItem[] | [];
}

export interface OrderItem {
    product_id: number;
    quantity: number;
}

export interface Order {
    orderNumber: string;
    date: string;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: string;
}