import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="checkout-card">
        <div class="header">
          <h1>💳 Checkout</h1>
          <p class="subtitle">Review your order</p>
        </div>

        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="summary-items">
            <div class="summary-item" *ngFor="let i of cart.items()">
              <span class="item-name">{{ i.name }} (×{{ i.quantity }})</span>
              <span class="item-price">{{ i.quantity * i.price | currency }}</span>
            </div>
          </div>
          <div class="summary-total">
            <span class="total-label">Total Amount</span>
            <span class="total-amount">{{ cart.total() | currency }}</span>
          </div>
        </div>

        <button 
          class="place-order-btn" 
          (click)="placeOrder()" 
          [disabled]="cart.items().length === 0">
          <span class="btn-icon">✓</span>
          <span>Place Order</span>
        </button>

        <p class="disclaimer">
          By placing this order, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 700px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }

      .checkout-card {
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

      .subtitle {
        font-size: 1.05rem;
        color: #718096;
      }

      .order-summary {
        padding: 2.5rem;
      }

      .order-summary h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2d3748;
        margin: 0 0 1.5rem 0;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e2e8f0;
      }

      .summary-items {
        margin-bottom: 2rem;
      }

      .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #f7fafc;
      }

      .item-name {
        color: #4a5568;
        font-size: 1.05rem;
        font-weight: 500;
      }

      .item-price {
        color: #667eea;
        font-size: 1.1rem;
        font-weight: 700;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
        border-radius: 12px;
        margin-top: 1.5rem;
      }

      .total-label {
        font-size: 1.25rem;
        font-weight: 700;
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

      .place-order-btn {
        width: calc(100% - 5rem);
        margin: 0 2.5rem 2rem 2.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.25rem 2rem;
        border: none;
        border-radius: 12px;
        font-size: 1.15rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      }

      .place-order-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
      }

      .place-order-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #cbd5e0;
        box-shadow: none;
      }

      .btn-icon {
        font-size: 1.5rem;
      }

      .disclaimer {
        text-align: center;
        color: #718096;
        font-size: 0.9rem;
        padding: 0 2.5rem 2rem 2.5rem;
        margin: 0;
      }
    `,
  ],
})
export class CheckoutPageComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  cart = inject(CartService);

  placeOrder() {
    const items = this.cart.items().map((i) => ({ productId: i.productId, quantity: i.quantity }));
    this.api.placeOrder(items).subscribe({
      next: () => {
        this.cart.clear();
        this.router.navigateByUrl('/');
      },
    });
  }
}


