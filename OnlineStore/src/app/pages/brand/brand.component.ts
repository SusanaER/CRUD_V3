import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/services/brand/brand.service';
import Swal from 'sweetalert2';
import { environment as e } from 'src/environments/environment';
import { BrandModel } from 'src/app/commun/models/brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandSubs!: Subscription;
  brand: BrandModel[] = [];
  brandAll: any = [];
  addForm !: FormGroup;
  
  constructor(private brandService: BrandService,private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.brandSubs = this.brandService.getBrand().subscribe(respuesta => {
        this.brandAll = respuesta;
      })
      localStorage.removeItem("id");
      this.addForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        webSite: ["", [Validators.required]]
      });
    }else{
      window.location.assign(e.PAGE_URL + 'login')
    }
  }

  get getListBrand(){
    return Object.keys(this.brandAll)
  }

  public update(brand: string): void{
    localStorage.setItem("brandId", brand);
    this.router.navigateByUrl("/updateBrand");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
  
  delete(id: string, name: string): void{
    this.brandService.deleteBrand(id).subscribe();
    setTimeout(function(){
      window.location.reload();
    }, 5);
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  add(){
    var name = this.addForm.getRawValue().name;
    var webSite = this.addForm.getRawValue().webSite;
    if(name === "" || webSite === ""){
      Swal.fire({
        title: 'Missing information',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.brandSubs = this.brandService.addBrand(name, webSite).subscribe();
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
  ngOnDestroy(): void {
  }
}

