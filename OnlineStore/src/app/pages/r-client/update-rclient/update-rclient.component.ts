import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RClientModel } from 'src/app/commun/models/rClient.model';
import { RClientService } from 'src/app/services/rClient/r-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-rclient',
  templateUrl: './update-rclient.component.html',
  styleUrls: ['./update-rclient.component.css']
})
export class UpdateRClientComponent implements OnInit {
  client!: RClientModel;
  id = localStorage.getItem("clientId");
  updateForm !: FormGroup;
  clientnSubs!: Subscription;

  constructor(private clientService: RClientService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("clientId")){
      this.updateForm = this.formBuilder.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        address: ["", [Validators.required]],
        postalCode: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of client not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.clientnSubs = this.clientService.getClientById(this.id).subscribe(
          (p: RClientModel) => {
            this.client = p;
            this.updateForm.setValue({
              firstName: this.client.firstName,
              lastName: this.client.lastName,
              dateOfBirth: this.client.dateOfBirth,
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

  update(){
    var id = this.id;
    var firstName = this.updateForm.getRawValue().firstName;
    var lastName = this.updateForm.getRawValue().lastName;
    var dateOfBirth = this.updateForm.getRawValue().dateOfBirth;
    var address = this.updateForm.getRawValue().address;
    var postalCode = this.updateForm.getRawValue().postalCode;
    var phoneNumber = this.updateForm.getRawValue().phoneNumber;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.clientnSubs = this.clientService.updateClient(id, firstName, lastName, dateOfBirth, address, postalCode, phoneNumber).subscribe();
      Swal.fire({
        title: 'Client Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/clients");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
