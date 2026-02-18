import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Product } from '../../core/api.service';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="product">
      <div class="product-card">
        <div class="layout">
          <div class="image-section">
            <img [src]="product.imageUrl" alt="{{ product.name }}" />
          </div>
          <div class="details-section">
            <h1>{{ product.name }}</h1>
            <p class="description">{{ product.description }}</p>
            <div class="price-section">
              <span class="price-label">Price</span>
              <span class="price">{{ product.price | currency }}</span>
            </div>
            <button class="add-to-cart-btn" (click)="addToCart()">
              <span class="btn-icon">🛒</span>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }

      .product-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        min-height: 500px;
      }

      .image-section {
        position: relative;
        background: #f7fafc;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      img {
        width: 100%;
        height: auto;
        max-height: 500px;
        object-fit: contain;
        border-radius: 12px;
      }

      .details-section {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .details-section h1 {
        font-size: 2rem;
        font-weight: 800;
        color: #2d3748;
        margin: 0 0 1rem 0;
        line-height: 1.2;
      }

      .description {
        color: #718096;
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 2rem;
      }

      .price-section {
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 2px solid #e2e8f0;
      }

      .price-label {
        display: block;
        color: #718096;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      .price {
        display: block;
        font-size: 2.5rem;
        font-weight: 900;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .add-to-cart-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      }

      .add-to-cart-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
      }

      .add-to-cart-btn:active {
        transform: translateY(0);
      }

      .btn-icon {
        font-size: 1.25rem;
      }

      @media (max-width: 900px) {
        .layout {
          grid-template-columns: 1fr;
        }

        .details-section {
          padding: 2rem;
        }
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private cart = inject(CartService);

  product?: Product;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getProduct(id).subscribe((p) => (this.product = p));
  }

  addToCart() {
    if (!this.product) return;
    this.cart.add({ productId: this.product.id, name: this.product.name, price: this.product.price, quantity: 1 });
  }
}


