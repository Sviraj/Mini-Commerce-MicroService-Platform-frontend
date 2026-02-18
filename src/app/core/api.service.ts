import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface AuthResponse {
  token: string;
  expiresAtUtc: string;
  fullName: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  // Match backend HTTPS port in launchSettings.json
  //private baseUrl = 'https://localhost:7210';
  private baseUrl = 'https://localhost:7165';

  products$ = signal<Product[]>([]);

  loadProducts() {
    this.http.get<Product[]>(`${this.baseUrl}/api/products`).subscribe((res) =>
      this.products$.set(res)
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${id}`);
  }

  register(fullName: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/register`, {
      fullName,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, {
      email,
      password,
    });
  }

  placeOrder(items: { productId: number; quantity: number }[]) {
    return this.http.post<{ orderId: number; orderDateUtc: string; total: number }>(
      `${this.baseUrl}/api/orders`,
      { items }
    );
  }
}


