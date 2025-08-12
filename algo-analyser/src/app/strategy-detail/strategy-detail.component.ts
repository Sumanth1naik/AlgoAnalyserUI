import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-strategy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './strategy-detail.component.html',
  styleUrls: ['./strategy-detail.component.css']
})
export class StrategyDetailComponent implements OnInit {
  strategyId: string | null = null;
  trades: any[] = [];
  errorMessage: string = '';
  loading = true;
  hoveredTrade: number | null = null;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.strategyId = this.route.snapshot.paramMap.get('id');
    this.fetchTrades();
  }

  fetchTrades(): void {
    const token = localStorage.getItem('access_token');

    this.http.get<any[]>(`http://127.0.0.1:8000/api/strategies/${this.strategyId}/trades/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        console.log('Trades loaded:', data); 
        this.trades = data;
        this.loading = false; // ✅ Set loading to false
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load trades:', err);
        this.errorMessage = 'Failed to load trades.';
        this.loading = false; // ✅ Ensure this is also set in error path
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  sortBy(key: string): void {
    this.trades.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }
}
