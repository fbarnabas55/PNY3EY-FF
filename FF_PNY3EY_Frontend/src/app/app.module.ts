import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderEditorComponent } from './pages/order-editor/order-editor.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
