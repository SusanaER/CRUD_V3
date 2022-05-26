import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/commun/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';
import { environment as e } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorySubs!: Subscription;
  category: CategoryModel[] = [];
  categoryAll: any = [];
  addForm !: FormGroup;
  
  constructor(private categoryService: CategoryService,private router: Router, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("login")){
      this.categorySubs = this.categoryService.getCategory().subscribe(respuesta => {
        this.categoryAll = respuesta;
      })
      localStorage.removeItem("id");
      this.addForm = this.formBuilder.group({
        name: ["", [Validators.required]],
      });
    }else{
      window.location.assign(e.PAGE_URL + 'login')
    }
  }

  get getListCategory(){
    return Object.keys(this.categoryAll)
  }

  public update(category: string): void{
    localStorage.setItem("categoryId", category);
    this.router.navigateByUrl("/updateCategory");
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }
  
  delete(id: string, name: string): void{
    this.categoryService.deleteCategory(id).subscribe();
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
    if(name === ""){
      Swal.fire({
        title: 'Missing information',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.categorySubs = this.categoryService.addCategory(name).subscribe();
      Swal.fire({
        title: 'Product added',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      setTimeout(function(){
        window.location.reload();
      }, 3);
    }
  }
  ngOnDestroy(): void {
  }
}

