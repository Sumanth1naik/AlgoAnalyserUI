import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  loginUser(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Access Token:', res.access);
console.log('Refresh Token:', res.refresh);
console.log('Username:', this.username);
        this.authService.setTokens(res.access, res.refresh, this.username);
        console.log('Stored Access:', localStorage.getItem('access_token'));
console.log('Stored Username:', localStorage.getItem('username'));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = err.error?.detail || 'Login failed. Please try again.';
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['authError'] === 'unauthorized') {
        this.errorMessage = 'You must be logged in to access the dashboard.';
      }
    });
  }
}
