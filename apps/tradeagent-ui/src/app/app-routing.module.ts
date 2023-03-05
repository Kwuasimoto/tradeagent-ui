import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AccountComponent,
  AuthComponent,
  HomeComponent,
  LayoutAccountComponent,
  LayoutAuthComponent,
  LayoutBaseComponent,
  LayoutTraderComponent, TraderComponent
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
    component: LayoutTraderComponent,
    children: [
      { path: 'trader', component: TraderComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
