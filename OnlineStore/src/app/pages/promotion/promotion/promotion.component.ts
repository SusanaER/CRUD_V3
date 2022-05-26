import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/services/brand/brand.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import Swal from 'sweetalert2';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  promotionSubs!: Subscription;
  promotion: any = [];
  addForm !: FormGroup;
  brand: any = [];
  brandSelected!: string;
  brandSubs!: Subscription;

  constructor(private promotionService: PromotionService, private brandService: BrandService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    localStorage.removeItem("id");
    if(localStorage.getItem("login")){
      this.getBrand();
      this.getData();
      this.addForm = this.formBuilder.group({
        productId: ["", [Validators.required]],
        description: ["", [Validators.required]],
        discounts: ["", [Validators.required]],
      });
      this.brandSelected = "1";
    }else{
      window.location.assign(e.PAGE_URL + 'login');
    }
  }

  getData(){
    this.promotionService.getPromotion().subscribe(respuesta => {
      this.promotion = respuesta;
    })
  }

  get getListData(){
    return Object.keys(this.promotion)
  }

  add(){
      var productId = this.addForm.getRawValue().productId;
      var description = this.addForm.getRawValue().description;
      var discounts = this.addForm.getRawValue().discounts;
      if(productId === "" || description === "" || discounts === ""){
        Swal.fire({
          title: 'Missing information',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.promotionSubs = this.promotionService.addPromotion(productId, description, discounts).subscribe();
        Swal.fire({
          title: 'Promotion added',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setTimeout(function(){
          window.location.reload();
        }, 5);
      }
    }

  moveToSale(id: string){
    localStorage.setItem("promotionId", id);
    window.location.assign(e.PAGE_URL + 'sale');
    
  }

  update(id: string){
    localStorage.setItem("promotionId", id);
    window.location.assign(e.PAGE_URL + 'updatePromotion');
  }

  delete(id: string){
    this.promotionService.deletePromotion(id).subscribe();
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setTimeout(function(){
      window.location.reload();
    }, 2);
  }

  ngOnDestroy(): void {
    this.promotionSubs.unsubscribe();
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
