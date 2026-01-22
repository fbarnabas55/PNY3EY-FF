import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderEditorComponent } from './pages/order-editor/order-editor.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  {path: 'orders', component: OrderListComponent},
  {path: "orders/new", component: OrderEditorComponent},
  { path: 'orders/edit/:id', component: OrderEditorComponent },
  { path: 'orders/create', component: OrderEditorComponent },
  { path: 'orders/:id/details', component: OrderDetailsComponent },
  {path: "statistics", component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
