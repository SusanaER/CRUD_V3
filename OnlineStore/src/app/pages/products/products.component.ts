import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productSubs!: Subscription;
  product: any = [];
  AddForm !: FormGroup;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.productService.getProduct().subscribe(respuesta => {
      this.product = respuesta;
    })
  }

  get getListData(){
    return Object.keys(this.product)
  }

  moveToSale(id: string){
    localStorage.setItem("productId", id);
    window.location.assign(e.PAGE_URL + 'sale');
    
  }

  ngOnDestroy(): void {
    this.productSubs.unsubscribe();
  }
}
