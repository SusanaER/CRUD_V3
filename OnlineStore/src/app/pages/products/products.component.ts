import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { environment as e } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BrandModel } from 'src/app/commun/models/brand.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import {formatDate} from '@angular/common';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productSubs!: Subscription;
  product: any = [];
  addForm !: FormGroup;
  brand: any = [];
  brandSelected!: string;
  brandSubs!: Subscription;

  constructor(private saleService: SaleService,private productService: ProductService, private brandService: BrandService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    localStorage.removeItem("id");
    if(localStorage.getItem("login")){
      this.getBrand();
      this.getData();
      this.addForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        image: ["", [Validators.required]],
        precio: ["", [Validators.required]],
        brandId: ["", [Validators.required]],
        categorysId: ["", [Validators.required]],
        client: ["", [Validators.required]],
      });
      this.brandSelected = "1";
    }else{
      window.location.assign(e.PAGE_URL + 'login');
    }
  }

  getData(){
    this.productService.getProduct().subscribe(respuesta => {
      this.product = respuesta;
    })
  }

  get getListData(){
    return Object.keys(this.product)
  }

  add(){
      var name = this.addForm.getRawValue().name;
      var description = this.addForm.getRawValue().description;
      var image = this.addForm.getRawValue().image;
      var precio = this.addForm.getRawValue().precio;
      var brandId = this.addForm.getRawValue().brandId;
      var categorysId = this.addForm.getRawValue().categorysId;
      if(name === "" || description === "" || image === "" 
      || precio === "" || brandId === "" || categorysId === ""){
        Swal.fire({
          title: 'Missing information',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.productSubs = this.productService.addProduct(name, description, image, precio, brandId, categorysId).subscribe();
        Swal.fire({
          title: 'Product added',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setTimeout(function(){
          window.location.reload();
        }, 2);
      }
    }

  sale(id: string){
    var client = this.addForm.getRawValue().client;
    var date = new Date();
    localStorage.setItem("productId", id);
    localStorage.setItem("clientId", client);
    console.log(client, date, id)
    this.productSubs = this.saleService.addSale(client, date.toISOString(), id).subscribe();
    Swal.fire({
      title: 'Product added',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setTimeout(function(){
      window.location.assign(e.PAGE_URL + 'sale');
    }, 2);
    
  }

  update(id: string){
    localStorage.setItem("productId", id);
    window.location.assign(e.PAGE_URL + 'updateProduct');
  }

  delete(id: string, name: string){
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  ngOnDestroy(): void {
    this.productSubs.unsubscribe();
  }

  getBrand(){
    this.brandSubs = this.brandService.getBrand().subscribe(respuesta => {
      this.brand = respuesta;
    })
  }

  get getListBrand(){
    return Object.keys(this.brand)
  }
}
