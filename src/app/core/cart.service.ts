import { Injectable, computed, signal } from '@angular/core';
import { ApiService } from './api.service';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);
  total = computed(() => this.items().reduce((s, i) => s + i.price * i.quantity, 0));

  constructor(private api: ApiService) {
    const saved = localStorage.getItem('cart');
    if (saved) this.items.set(JSON.parse(saved));
  }

  private persist() {
    localStorage.setItem('cart', JSON.stringify(this.items()));
  }

  add(item: CartItem) {
    const existing = this.items().find((i) => i.productId === item.productId);
    if (existing) existing.quantity += item.quantity;
    else this.items.update((arr) => [...arr, item]);
    this.items.set([...this.items()]);
    this.persist();
  }

  remove(productId: number) {
    this.items.set(this.items().filter((i) => i.productId !== productId));
    this.persist();
  }

  clear() {
    this.items.set([]);
    localStorage.removeItem('cart');
  }
}


