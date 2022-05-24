import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as e } from 'src/environments/environment';
import { ProductModel } from 'src/app/commun/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ObjToArrayPipe } from 'src/app/commun/pipes/objToArray.pipe';


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

  ngOnDestroy(): void {
    this.productSubs.unsubscribe();
  }
}
