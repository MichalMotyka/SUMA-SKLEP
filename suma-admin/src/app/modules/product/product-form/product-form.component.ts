import { Component } from '@angular/core';
import {Category, CategoryDTO, CategoryService} from "../../../core/service/category.service";
import {catchError, Observable, throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product, ProductService} from "../../../core/service/product.service";
import {Response} from "../../../core/model/response.model";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$: Observable<CategoryDTO[]> = new Observable<CategoryDTO[]>();
  formGroup = new FormGroup({
    uuid: new FormControl({value: '', disabled: true}),
    name: new FormControl('',Validators.required),
    available: new FormControl({value:'',disabled:true}),
    quantity: new FormControl({value:'',disabled:true}),
    price: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    active: new FormControl(true),
    mainImage: new FormControl('',Validators.required)
  })
  viewMode: any;

  constructor(private categoryService:CategoryService,private productService:ProductService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    this.categories$ = categoryService.getCategory("ASSIGNABLE", false, "");
  }

  onFileSelected($event: Event) {

  }

  commit() {
    this.productService.createProduct(this.getProduct()).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
          return throwError(error.error);
        } else {
          return throwError(error.message);
        }
      })
    ).subscribe(response => {
      if (response.code === 'SUCCESS') {
        this.toaster.success("Pomyślnie edytowano kategorie", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.close(this);
      } else {
        this.toaster.error(response.message, "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    }, (error: Response) => {
      this.toaster.error(error.message, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    });
  }

  getProduct(){
    return new Product(
      "",
      this.formGroup.controls.name.value,
      this.formGroup.controls.description.value,
      this.formGroup.controls.category.value,
      0,
      0,
      this.formGroup.controls.price.value,
      this.formGroup.controls.mainImage.value,
      [],
      this.formGroup.controls.active.value)
  }
}
