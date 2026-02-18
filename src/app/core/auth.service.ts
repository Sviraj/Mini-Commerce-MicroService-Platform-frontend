import { Injectable, signal } from '@angular/core';
import { ApiService, AuthResponse } from './api.service';

export interface UserState {
  token: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<UserState>({ token: null, fullName: null, email: null, role: null });

  constructor(private api: ApiService) {
    const saved = localStorage.getItem('auth');
    if (saved) {
      this.user.set(JSON.parse(saved));
    }
  }

  private storeAuth(res: AuthResponse) {
    console.log('response auth', res);
    const state: UserState = {
      token: res.token,
      fullName: res.fullName,
      email: res.email,
      role: res.role,
    };
    this.user.set(state);
    localStorage.setItem('auth', JSON.stringify(state));
  }

  register(fullName: string, email: string, password: string) {
    return this.api.register(fullName, email, password).subscribe((res) => this.storeAuth(res));
  }

  login(email: string, password: string) {
    return this.api.login(email, password).subscribe((res) => this.storeAuth(res));
  }

  logout() {
    this.user.set({ token: null, fullName: null, email: null, role: null });
    localStorage.removeItem('auth');
  }
}


