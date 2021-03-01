import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { AboutComponent } from './components/public/about/about.component';
import { CrudComponent } from './components/private/crud/crud.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { GalleryComponent } from './components/private/gallery/gallery.component';
import { ProfileComponent } from './components/private/profile/profile.component';
import { CanActivateRoute } from './helpers/authGuard/can-activate-route.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'crud', component: CrudComponent, canActivate: [CanActivateRoute] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRoute],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [CanActivateRoute],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CanActivateRoute],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
