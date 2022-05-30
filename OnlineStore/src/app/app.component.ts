import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as e } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineStore';
  isinAdmin: boolean;
  isInSession: boolean;

  constructor(private router: Router){
    this.isinAdmin = false;
    if(window.location.href == e.PAGE_URL +'products' || window.location.href == e.PAGE_URL +'brand'  ){
      this.isinAdmin = true;
    }

    this.isInSession = true;
    if(window.location.href == e.PAGE_URL + 'login'){
      this.isInSession = false;
    }
  }

  products(){
    window.location.assign(e.PAGE_URL+'products');
  }

  brand(){
    window.location.assign(e.PAGE_URL+'brand');
  }

  promotion(){
    window.location.assign(e.PAGE_URL+'promotion');
  }


  category(){
    window.location.assign(e.PAGE_URL+'category');
  }

  clients(){
    window.location.assign(e.PAGE_URL+'clients');
  }

  inventory(){
    window.location.assign(e.PAGE_URL+'inventory');
  }
}

