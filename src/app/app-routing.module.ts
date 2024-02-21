import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PenelComponent } from './components/penel/penel.component';
import { loginGuards } from './guards/guards';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'panel', component: PenelComponent,
    canActivate: [
      loginGuards
    ],
    children: [
      {
        path: 'shipping', component: ShippingFormComponent
      },
      {
        path: 'all-shipping', component: TableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
