import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/commun/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category!: CategoryModel;
  id = localStorage.getItem("categoryId");
  updateForm !: FormGroup;
  categorynSubs!: Subscription;

  constructor(private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("login") && localStorage.getItem("categoryId")){
      this.updateForm = this.formBuilder.group({
        name: ["", [Validators.required]],
      });
      if (this.id == null){
        Swal.fire({
          title: 'Id of category not found.',
          text: 'Please check the data.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }else{
        this.categorynSubs = this.categoryService.getCategoryById(this.id).subscribe(
          (p: CategoryModel) => {
            this.category = p;
            this.updateForm.setValue({
              name: this.category.name,
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
    var name = this.updateForm.getRawValue().name;
    if(id === null){
      Swal.fire({
        title: 'Id is null',
        text: 'Please check the data.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else{
      this.categorynSubs = this.categoryService.updateCategory(id, name).subscribe();
      Swal.fire({
        title: 'Category Id: ' + id + ' edited',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      this.router.navigateByUrl("/category");
      setTimeout(function(){
        window.location.reload();
      }, 2);
    }
  }
}
