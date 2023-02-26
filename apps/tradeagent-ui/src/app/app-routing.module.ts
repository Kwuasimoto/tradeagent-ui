import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AccountComponent,
  AuthComponent,
  ConsoleComponent,
  HomeComponent,
  LayoutAccountComponent,
  LayoutAuthComponent,
  LayoutBaseComponent,
  LayoutConsoleComponent
} from "./components";

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: LayoutAccountComponent,
    children: [
      { path: 'account', component: AccountComponent, pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      { path: 'auth', component: AuthComponent, pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LayoutConsoleComponent,
    children: [
      { path: 'console', component: ConsoleComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
