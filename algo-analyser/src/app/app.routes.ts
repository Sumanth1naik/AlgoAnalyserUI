import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { UploadComponent } from './upload/upload.component';
import { StrategyDetailComponent } from './strategy-detail/strategy-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // 🔐 Guard added here
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'strategy/:id', component: StrategyDetailComponent },
];
