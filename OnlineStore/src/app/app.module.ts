import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RClientComponent } from './pages/r-client/r-client.component';
import { ObjToArrayPipe } from './commun/pipes/objToArray.pipe';
import { SaleComponent } from './pages/sale/sale.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { BrandComponent } from './pages/brand/brand.component';
import { UpdateBrandComponent } from './pages/brand/update-brand/update-brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category.component';
import { PromotionComponent } from './pages/promotion/promotion/promotion.component';
import { UpdatePromotionComponent } from './pages/promotion/update-promotion/update-promotion.component';
import { UpdateRClientComponent } from './pages/r-client/update-rclient/update-rclient.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { UpdateInventoryComponent } from './pages/inventory/update-inventory/update-inventory.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    RClientComponent,
    ObjToArrayPipe,
    SaleComponent,
    LoginComponent,
    UpdateProductComponent,
    BrandComponent,
    UpdateBrandComponent,
    CategoryComponent,
    UpdateCategoryComponent,
    PromotionComponent,
    UpdatePromotionComponent,
    UpdateRClientComponent,
    InventoryComponent,
    UpdateInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
