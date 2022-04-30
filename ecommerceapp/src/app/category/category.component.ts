import { CategoryModel } from './category.model';
import { ApiService } from '../json frontend/api.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Product } from '../product';

import { CategoriesService } from '../categories.service';
import { Categories } from '../categories';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //CRUD YT
  formValue !: FormGroup;
  categoryModelObject : CategoryModel = new CategoryModel();
  categoryData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  category: Categories[] = [];
  currentUser : User | null = null;

  products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoriesService, 
    private userService:UserService,
    private api : ApiService
    ) {}

    public addCategory: Categories = {
      id: 0,
      name: '',
      description: '',
      icon: '',
      categoryCode: ''
    };

    public editCategory: Categories= {
      id: 0,
      name: '',
      description: '',
      icon: '',
      categoryCode: ''
    };  
    public deleteCategory: Categories = {
      id: 0,
      name: '',
      description: '',
      icon: '',
      categoryCode: ''
    };

  ngOnInit(): void {
    this.getCategory();

    //CRUD YT
    this.formValue = this.formBuilder.group({
      name : [''],
      description : [''],
      icon : [''],
    }),
    this.getAllCategory();

    this.formValue =  new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      icon: new FormControl()
    });

    this.currentUser = this.userService.getCurrentUser();
  }


  getCategory(): void {
    this.categoryService.getCategory()
        .subscribe(category => this.category = category);
  }

  public onAddCategory(addForm: NgForm): void {
    document.getElementById('add-category-form')!.click();
    this.categoryService.addCategory(addForm.value).subscribe(
      (response: Categories) => {
        console.log(response);
        this.getCategory();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  updateCategory(category: Categories): void {
    this.categoryService.updateCategory(category).subscribe(
      (response: Categories) => {
        console.log(response);
        this.getCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
  }

  public onDeleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
  }

  public onOpenModal(category: Categories, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.addCategory = category;
      button.setAttribute('data-target', '#addCategoryModal');
    }
    if (mode === 'edit') {
      this.editCategory = category;
      button.setAttribute('data-target', '#updateCategoryModal');
    }
    if (mode === 'delete') {
      this.deleteCategory = category;
      button.setAttribute('data-target', '#deleteCategoryModal');
    }

    container?.appendChild(button);
    button.click();
    
  }


  //CRUD YT - Frontend & JSON

  postCategoryDetails(){
    this.categoryModelObject.name =this.formValue.value.name;
    this.categoryModelObject.description =this.formValue.value.description;
    this.categoryModelObject.icon =this.formValue.value.icon;

    this.api.postCategory(this.categoryModelObject)
    .subscribe(response => {
      console.log(response);
      alert("Category Added Successfully")
      let reference = document.getElementById('cancel')
      reference?.click();
      this.formValue.reset();
      this.getAllCategory();
    },
    error => {
      alert("SOMETHING WENT WRONG")
    })
  }

  getAllCategory(){
    this.api.getCategory()
    .subscribe(response=>{
      this.categoryData = response;
    })
  }

  deletingCategory(category: any){
    this.api.deletingCategory(category.id)
    .subscribe(response=>{
      alert("Category Deleted");
      this.getAllCategory();
    })
  }

  onEditCategory(category: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.categoryModelObject.id = category.id;
    this.formValue.controls['name'].setValue(category.name);
    this.formValue.controls['description'].setValue(category.description);
    this.formValue.controls['icon'].setValue(category.icon);
  }


  updateCategoryDetails(){
    this.categoryModelObject.id = this.formValue.value.id;
    this.categoryModelObject.name = this.formValue.value.name;
    this.categoryModelObject.description = this.formValue.value.description;
    this.categoryModelObject.icon = this.formValue.value.icon;

    this.api.updateCategory(this.categoryModelObject, this.categoryModelObject.id) 
    .subscribe(referense => {
      alert("Updated Successfuly");
      let reference = document.getElementById('cancel')
      referense?.click();
      this.formValue.reset();
      this.getAllCategory();
    })   
  }

  clickAddCategory(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

}


