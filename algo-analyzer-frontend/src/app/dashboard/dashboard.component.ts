import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent  implements OnInit{
   username: string | null = null;
   
  constructor(private authService: AuthService, private router: Router) {}

 

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log('Logged-in Username:', this.username);
  }

  logout(): void {
    this.authService.logout(); // handles token removal + redirect
    this.router.navigate(['/login']);
  }
}
