import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RClientService } from 'src/app/services/rClient/r-client.service';
import Swal from 'sweetalert2';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-r-client',
  templateUrl: './r-client.component.html',
  styleUrls: ['./r-client.component.css']
})
export class RClientComponent implements OnInit {
  clientSubs!: Subscription;
  client: any = [];
  addForm !: FormGroup;
  brand: any = [];
  brandSelected!: string;
  brandSubs!: Subscription;

  constructor(private clientService: RClientService, private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    localStorage.removeItem("id");
    if(localStorage.getItem("login")){
      this.getData();
      this.addForm = this.formBuilder.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        address: ["", [Validators.required]],
        postalCode: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]],
      });
      this.brandSelected = "1";
    }else{
      window.location.assign(e.PAGE_URL + 'login');
    }
  }

  getData(){
    this.clientService.getClient().subscribe(respuesta => {
      this.client = respuesta;
    })
  }

  get getListData(){
    return Object.keys(this.client)
  }

  add(){
      var firstName = this.addForm.getRawValue().firstName;
      var lastName = this.addForm.getRawValue().lastName;
      var dateOfBirth = this.addForm.getRawValue().dateOfBirth;
      var address = this.addForm.getRawValue().address;
      var postalCode = this.addForm.getRawValue().postalCode;
      var phoneNumber = this.addForm.getRawValue().phoneNumber;
      if(firstName === "" || lastName === "" || dateOfBirth === "" 
      || address === "" || postalCode === "" || phoneNumber === ""){
        Swal.fire({
          title: 'Missing information',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.clientSubs = this.clientService.addClient(firstName, lastName, dateOfBirth, address, postalCode, phoneNumber).subscribe();
        Swal.fire({
          title: 'Client added',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setTimeout(function(){
          window.location.reload();
        }, 7);
      }
    }

  moveToSale(id: string){
    localStorage.setItem("clientId", id);
    window.location.assign(e.PAGE_URL + 'sale');
    
  }

  update(id: string){
    localStorage.setItem("clientId", id);
    window.location.assign(e.PAGE_URL + 'updateClient');
  }

  delete(id: string, name: string){
    this.clientService.deleteClient(id).subscribe();
    Swal.fire({
      title: name + ' deleted',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setTimeout(function(){
      window.location.reload();
    }, 7);
  }

  ngOnDestroy(): void {
    this.clientSubs.unsubscribe();
  }

  get getListBrand(){
    return Object.keys(this.brand)
  }
}
