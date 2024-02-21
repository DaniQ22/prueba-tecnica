import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import {  HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { PenelComponent } from './components/penel/penel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SidebarComponent,
    LoginComponent,
    PenelComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
