import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import Swal from 'sweetalert2';
import { environment as e } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventorySubs!: Subscription;
  inventory: any = [];
  addForm !: FormGroup;
  brand: any = [];
  brandSelected!: string;
  brandSubs!: Subscription;

  constructor(private inventoryService: InventoryService, private productService: ProductService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    localStorage.removeItem("id");
    if(localStorage.getItem("login")){
      this.getData();
      this.addForm = this.formBuilder.group({
        productId: ["", [Validators.required]],
        quantity: ["", [Validators.required]],
      });
      this.brandSelected = "1";
    }else{
      window.location.assign(e.PAGE_URL + 'login');
    }
  }

  getData(){
    this.inventoryService.getInventory().subscribe(respuesta => {
      this.inventory = respuesta;
    })
  }

  get getListData(){
    return Object.keys(this.inventory)
  }

  add(){
      var productId = this.addForm.getRawValue().productId;
      var quantity = this.addForm.getRawValue().quantity;
      if(productId === "" || quantity === ""){
        Swal.fire({
          title: 'Missing information',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.inventorySubs = this.inventoryService.addInventory(productId, quantity).subscribe();
        Swal.fire({
          title: 'Inventory added',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setTimeout(function(){
          window.location.reload();
        }, 10);
      }
    }

  moveToSale(id: string){
    localStorage.setItem("inventoryId", id);
    window.location.assign(e.PAGE_URL + 'sale');
    
  }

  update(id: string){
    localStorage.setItem("inventoryId", id);
    window.location.assign(e.PAGE_URL + 'updateInventory');
  }

  delete(id: string){
    this.inventoryService.deleteInventory(id).subscribe();
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setTimeout(function(){
      window.location.reload();
    }, 5);
  }

  ngOnDestroy(): void {
    this.inventorySubs.unsubscribe();
  }

  get getListBrand(){
    return Object.keys(this.brand)
  }
}
