import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StrategyService } from '../services/strategy.service';  // ✅ Your Strategy Service

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  strategies: any[] = [];  // ✅ Declare and initialize

  constructor(
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private strategyService: StrategyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log('Username:', this.username);

    this.loadStrategies();
  }
loading: boolean = true;

loadStrategies(): void {
  this.strategyService.getStrategies().subscribe({
    next: (res) => {
      console.log(res)
      this.strategies = res;
      this.loading = false;
      this.cdRef.detectChanges();
    },
    error: (err) => {
      console.error('Failed to load strategies:', err);
      this.loading = false;
    }
  });
}


  goToUpload(): void {
    console.log('Navigating to Upload');
    this.router.navigate(['/upload']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  viewStrategy(id: number): void {
    this.router.navigate(['/strategy', id]);
  }
}
