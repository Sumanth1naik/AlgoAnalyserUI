export interface Strategy {
  id: number;
  strategy_name: string;
  uploaded_at: string;
  total_trades?: number;  // optional for now
}
