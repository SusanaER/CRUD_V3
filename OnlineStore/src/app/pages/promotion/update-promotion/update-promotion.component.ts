import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PromotionModel } from 'src/app/commun/models/promotion.model';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.css']
})
export class UpdatePromotionComponent implements OnInit {
  promotion!: PromotionModel;
  id = localStorage.getItem("promotionId");
  updateForm !: FormGroup;
  promotionnSubs!: Subscription;

  constructor(private promotionService: PromotionService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("promotionId")){
      this.updateForm = this.formBuilder.group({
        productId: ["", [Validators.required]],
        description: ["", [Validators.required]],
        discounts: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of promotion not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.promotionnSubs = this.promotionService.getPromotionById(this.id).subscribe(
          (p: PromotionModel) => {
            this.promotion = p;
            this.updateForm.setValue({
              productId: this.promotion.productId,
              description: this.promotion.description,
              discounts: this.promotion.discounts,
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
    var productId = this.updateForm.getRawValue().productId;
    var description = this.updateForm.getRawValue().description;
    var discounts = this.updateForm.getRawValue().discounts;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.promotionnSubs = this.promotionService.updatePromotion(id, productId, description, discounts).subscribe();
      Swal.fire({
        title: 'Promotion Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/promotion");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
