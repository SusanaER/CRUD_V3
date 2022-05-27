import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/commun/models/product.model';
import { RClientModel } from 'src/app/commun/models/rClient.model';
import { ProductService } from 'src/app/services/product/product.service';
import { RClientService } from 'src/app/services/rClient/r-client.service';
import Swal from 'sweetalert2';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  product!: ProductModel;
  client!: RClientModel;
  id = localStorage.getItem("productId");
  clientId = localStorage.getItem("clientId");
  productForm !: FormGroup;
  clientForm !: FormGroup;
  productnSubs!: Subscription;
  clientSubs!: Subscription;
  image = "";
  date = new Date();

  constructor(private clientService: RClientService,private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("productId") && localStorage.getItem("clientId")){
      this.productForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        description: ["", [Validators.required]],
        image: ["", [Validators.required]],
        precio: ["", [Validators.required]],
        brandId: ["", [Validators.required]],
        categorysId: ["", [Validators.required]],
      });
      this.clientForm = this.formBuilder.group({
        id: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        address: ["", [Validators.required]],
        postalCode: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]],
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
            this.productForm.setValue({
              name: this.product.name,
              description: this.product.description,
              image: this.product.image,
              precio: this.product.precio,
              brandId: this.product.brandId,
              categorysId: this.product.categorysId,
            });
            this.image = this.productForm.getRawValue().image;
          }
        )
        this.clientSubs = this.clientService.getClientById(this.id).subscribe(
          (p: RClientModel) => {
            this.client = p;
            this.clientForm.setValue({
              id: this.client.id,
              firstName: this.client.firstName,
              lastName: this.client.lastName,
              producId: this.client.dateOfBirth,
              address: this.client.address,
              postalCode: this.client.postalCode,
              phoneNumber: this.client.phoneNumber,
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

  exportAsPDF(divId: any)
  {
      let data = document.getElementById('divId');
      if(data === null){
        console.log("data null")
      }else{
        html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
        //let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
        pdf.save('OnlineStore.pdf'); 
      }); 
    }
  }
}

