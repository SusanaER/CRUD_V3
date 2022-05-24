import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RClientComponent } from './pages/r-client/r-client.component';
import { SaleComponent } from './pages/sale/sale.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: 'products', component: ProductsComponent},
  {path: 'rClients', component: RClientComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sale', component: SaleComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
