import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  {path: 'orders', component: OrderListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
