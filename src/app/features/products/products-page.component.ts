import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>✨ Featured Products</h1>
        <p class="subtitle">Discover our curated collection</p>
      </div>
      <div class="grid" *ngIf="api.products$().length > 0">
        <a class="card" *ngFor="let p of api.products$()" [routerLink]="['/products', p.id]">
          <div class="card-image">
            <img [src]="p.imageUrl" alt="{{ p.name }}" />
            <div class="card-overlay">
              <span class="view-details">View Details →</span>
            </div>
          </div>
          <div class="card-content">
            <h3>{{ p.name }}</h3>
            <p class="description">{{ p.description }}</p>
            <div class="price-tag">
              <span class="price">{{ p.price | currency }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="empty-state" *ngIf="api.products$().length === 0">
        <div class="empty-icon">🛍️</div>
        <h3>No products available</h3>
        <p>Check back soon for new arrivals!</p>
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

      .header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #4a5568;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
      }

      .card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
      }

      .card-image {
        position: relative;
        overflow: hidden;
        height: 220px;
      }

      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .card:hover .card-image img {
        transform: scale(1.1);
      }

      .card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .card:hover .card-overlay {
        opacity: 1;
      }

      .view-details {
        color: white;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .card-content {
        padding: 1.5rem;
      }

      .card-content h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: #2d3748;
      }

      .description {
        color: #718096;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .price-tag {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
      }

      .price {
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .empty-state h3 {
        color: #2d3748;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .empty-state p {
        color: #718096;
        font-size: 1.1rem;
      }
    `,
  ],
})
export class ProductsPageComponent implements OnInit {
  api = inject(ApiService);
  ngOnInit(): void {
    this.api.loadProducts();
  }
}


