import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventoryModel } from 'src/app/commun/models/inventory.model';
import { ProductModel } from 'src/app/commun/models/product.model';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {
  inventory!: InventoryModel;
  id = localStorage.getItem("inventoryId");
  updateForm !: FormGroup;
  inventorynSubs!: Subscription;
  product!: ProductModel;

  constructor(private inventoryService: InventoryService, private productService: ProductService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("inventoryId")){
      this.updateForm = this.formBuilder.group({
        productId: ["", [Validators.required]],
        quantity: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of inventory not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.inventorynSubs = this.inventoryService.getInventoryById(this.id).subscribe(
          (p: InventoryModel) => {
            this.inventory = p;
            this.updateForm.setValue({
              productId: this.inventory.productId,
              quantity: this.inventory.quantity,
            });
            this.inventorynSubs = this.productService.getProductById(this.inventory.productId).subscribe(
              (p: ProductModel) => {
                this.product = p;
              }
            )
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
    var quantity = this.updateForm.getRawValue().quantity;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.inventorynSubs = this.inventoryService.updateInventory(id, productId, quantity).subscribe();
      Swal.fire({
        title: 'Inventory Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/inventory");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
