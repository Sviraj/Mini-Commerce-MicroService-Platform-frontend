import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="auth-card">
        <div class="header">
          <h1>👋 Welcome Back</h1>
          <p class="subtitle">Sign in to continue shopping</p>
        </div>

        <form class="form" (ngSubmit)="submit()" #f="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              id="email"
              name="email" 
              type="email"
              [(ngModel)]="email" 
              placeholder="you@example.com" 
              required 
              class="form-input" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password"
              name="password" 
              type="password"
              [(ngModel)]="password" 
              placeholder="••••••••" 
              required 
              class="form-input" />
          </div>

          <button type="submit" class="submit-btn" [disabled]="!f.valid">
            <span>Sign In</span>
            <span class="btn-icon">→</span>
          </button>
        </form>

        <p class="switch-auth">
          Don't have an account? 
          <a routerLink="/register">Create one</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 500px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }

      .auth-card {
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

      .form {
        padding: 2.5rem;
      }

      .form-group {
        margin-bottom: 1.75rem;
      }

      label {
        display: block;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }

      .form-input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;
      }

      .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .form-input::placeholder {
        color: #cbd5e0;
      }

      .submit-btn {
        width: 100%;
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
        margin-top: 2rem;
      }

      .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
      }

      .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .btn-icon {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .switch-auth {
        text-align: center;
        color: #718096;
        padding: 0 2.5rem 2.5rem 2.5rem;
        margin: 0;
      }

      .switch-auth a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.2s;
      }

      .switch-auth a:hover {
        color: #764ba2;
      }
    `,
  ],
})
export class LoginPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = '';
  password = '';

  submit() {
    this.auth.login(this.email, this.password)!.add(() => this.router.navigateByUrl('/'));
  }
}


