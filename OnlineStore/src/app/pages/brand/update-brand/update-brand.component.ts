import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandModel } from 'src/app/commun/models/brand.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {
  brand!: BrandModel;
  id = localStorage.getItem("brandId");
  updateForm !: FormGroup;
  brandnSubs!: Subscription;

  constructor(private brandService: BrandService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("brandId")){
      this.updateForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        webSite: ["", [Validators.required]]
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of brand not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.brandnSubs = this.brandService.getBrandById(this.id).subscribe(
          (p: BrandModel) => {
            this.brand = p;
            this.updateForm.setValue({
              name: this.brand.name,
              webSite: this.brand.webSite,
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
    var webSite = this.updateForm.getRawValue().webSite;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.brandnSubs = this.brandService.updateBrand(id, name, webSite).subscribe();
      Swal.fire({
        title: 'Brand Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/brand");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
