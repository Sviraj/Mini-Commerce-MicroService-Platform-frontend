import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="cart-card">
        <div class="header">
          <h1>🛒 Shopping Cart</h1>
          <p class="item-count">{{ cart.items().length }} item(s)</p>
        </div>

        <div class="empty-cart" *ngIf="cart.items().length === 0">
          <div class="empty-icon">🛍️</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <a class="shop-now-btn" routerLink="/">Browse Products</a>
        </div>

        <div class="cart-items" *ngIf="cart.items().length > 0">
          <div *ngFor="let i of cart.items()" class="cart-item">
            <div class="item-info">
              <h3>{{ i.name }}</h3>
              <p class="item-details">{{ i.quantity }} × {{ i.price | currency }}</p>
            </div>
            <div class="item-actions">
              <span class="item-total">{{ i.quantity * i.price | currency }}</span>
              <button class="remove-btn" (click)="cart.remove(i.productId)">
                <span>🗑️</span>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-footer" *ngIf="cart.items().length > 0">
          <div class="total-section">
            <span class="total-label">Total</span>
            <span class="total-amount">{{ cart.total() | currency }}</span>
          </div>
          <a class="checkout-btn" routerLink="/checkout">
            <span>Proceed to Checkout</span>
            <span class="btn-icon">→</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }

      .cart-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .header {
        padding: 2.5rem 2rem;
        text-align: center;
        border-bottom: 2px solid #e2e8f0;
      }

      .header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 0.5rem 0;
      }

      .item-count {
        font-size: 1rem;
        color: #718096;
      }

      .empty-cart {
        text-align: center;
        padding: 4rem 2rem;
      }

      .empty-icon {
        font-size: 5rem;
        margin-bottom: 1rem;
      }

      .empty-cart h3 {
        font-size: 1.5rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .empty-cart p {
        color: #718096;
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }

      .shop-now-btn {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.875rem 2rem;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }

      .shop-now-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
      }

      .cart-items {
        padding: 1.5rem;
      }

      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.2s;
      }

      .cart-item:hover {
        background: #f7fafc;
      }

      .item-info h3 {
        font-size: 1.1rem;
        color: #2d3748;
        margin: 0 0 0.5rem 0;
        font-weight: 600;
      }

      .item-details {
        color: #718096;
        font-size: 0.95rem;
      }

      .item-actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      .item-total {
        font-size: 1.25rem;
        font-weight: 700;
        color: #667eea;
      }

      .remove-btn {
        background: #fee;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.25rem;
        transition: background 0.2s, transform 0.2s;
      }

      .remove-btn:hover {
        background: #fcc;
        transform: scale(1.1);
      }

      .cart-footer {
        padding: 2rem;
        background: #f7fafc;
        border-top: 2px solid #e2e8f0;
      }

      .total-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 1rem 0;
      }

      .total-label {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2d3748;
      }

      .total-amount {
        font-size: 2rem;
        font-weight: 900;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .checkout-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      }

      .checkout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
      }

      .btn-icon {
        font-size: 1.5rem;
        font-weight: bold;
      }

      @media (max-width: 600px) {
        .cart-item {
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }

        .item-actions {
          width: 100%;
          justify-content: space-between;
        }
      }
    `,
  ],
})
export class CartPageComponent {
  cart = inject(CartService);
}


