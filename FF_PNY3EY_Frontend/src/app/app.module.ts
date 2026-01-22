import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderEditorComponent } from './pages/order-editor/order-editor.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderEditorComponent,
    NavListComponent,
    OrderDetailsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BaseChartDirective,
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
