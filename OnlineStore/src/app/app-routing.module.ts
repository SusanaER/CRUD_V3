import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
import { UpdateBrandComponent } from './pages/brand/update-brand/update-brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { UpdateInventoryComponent } from './pages/inventory/update-inventory/update-inventory.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { PromotionComponent } from './pages/promotion/promotion/promotion.component';
import { UpdatePromotionComponent } from './pages/promotion/update-promotion/update-promotion.component';
import { RClientComponent } from './pages/r-client/r-client.component';
import { UpdateRClientComponent } from './pages/r-client/update-rclient/update-rclient.component';
import { SaleComponent } from './pages/sale/sale.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'products', component: ProductsComponent},
  {path: 'updateProduct', component: UpdateProductComponent},
  {path: 'clients', component: RClientComponent},
  {path: 'updateClient', component: UpdateRClientComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'brand', component: BrandComponent},
  {path: 'updateBrand', component: UpdateBrandComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'updateCategory', component: UpdateCategoryComponent},
  {path: 'promotion', component: PromotionComponent},
  {path: 'updatePromotion', component: UpdatePromotionComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'updateInventory', component: UpdateInventoryComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
