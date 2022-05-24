import { Component, OnInit } from '@angular/core';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("login")){
      console.log("Esta loggin")
    }else{
      window.location.assign(e.PAGE_URL + 'login');
    }
  }

}
