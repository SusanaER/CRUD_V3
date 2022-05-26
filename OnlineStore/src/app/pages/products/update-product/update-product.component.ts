import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/commun/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product!: ProductModel;
  id = localStorage.getItem("productId");
  updateForm !: FormGroup;
  productnSubs!: Subscription;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("productId")){
      this.updateForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        image: ["", [Validators.required]],
        precio: ["", [Validators.required]],
        brandId: ["", [Validators.required]],
        categorysId: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of product not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.productnSubs = this.productService.getProductById(this.id).subscribe(
          (p: ProductModel) => {
            this.product = p;
            this.updateForm.setValue({
              name: this.product.name,
              description: this.product.description,
              image: this.product.image,
              precio: this.product.precio,
              brandId: this.product.brandId,
              categorysId: this.product.categorysId,
            });
          }
        )
      }
    }else{
      this.router.navigateByUrl('login');
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }
  }

  update(){
    var id = this.id;
    var name = this.updateForm.getRawValue().name;
    var description = this.updateForm.getRawValue().description;
    var image = this.updateForm.getRawValue().image;
    var precio = this.updateForm.getRawValue().precio;
    var brandId = this.updateForm.getRawValue().brandId;
    var categoryId = this.updateForm.getRawValue().categoryId;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.productnSubs = this.productService.updateProduct(id, name, description, image, precio, brandId, categoryId).subscribe();
      Swal.fire({
        title: 'Product Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/product");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
