import {Component, Inject} from '@angular/core';
import {Category, CategoryDTO, CategoryService} from "../../../core/service/category.service";
import {catchError, Observable, throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product, ProductService} from "../../../core/service/product.service";
import {Response} from "../../../core/model/response.model";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
    mainImage: new FormControl('')
  })
  viewMode: boolean;
  editMode:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Category,viewMode:boolean,editMode:boolean},private categoryService:CategoryService,private productService:ProductService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    this.viewMode = data.viewMode
    this.editMode = data.editMode
    if (data.viewMode){
      this.formGroup.controls.name.disable()
      this.formGroup.controls.price.disable()
      this.formGroup.controls.description.disable()
      this.formGroup.controls.category.disable()
      this.formGroup.controls.active.disable()
      this.formGroup.controls.mainImage.disable()
    }
    if (data.viewMode || data.editMode){
      this.productService.getProductByUuid(data.row.uuid).subscribe(value => {
        this.formGroup.controls.uuid.setValue(value.uuid)
        this.formGroup.controls.name.setValue(value.name)
        this.formGroup.controls.available.setValue(value.available.toString())
        this.formGroup.controls.quantity.setValue(value.count.toString())
        this.formGroup.controls.price.setValue(value.price)
        this.formGroup.controls.description.setValue(value.description)
        // @ts-ignore
        this.formGroup.controls.category.setValue(value.category?.uuid)
        this.formGroup.controls.active.setValue(value.active)
        this.formGroup.controls.mainImage.setValue(value.mainImg)
      })
    }


    this.categories$ = categoryService.getCategory("ASSIGNABLE", false, "");
  }

  onFileSelected($event: Event) {

  }
  save(){
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
        this.toaster.success("Pomyślnie dodano produkt", "Sukces", {
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

  edit(){
    this.productService.editProduct(this.getProduct()).subscribe(res=>{
      this.toaster.success("Pomyślnie zmieniono produkt", "Sukces", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
      this.dialog.close(this);
    },error => {
      this.toaster.error(error.message, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }

  commit() {
    if (this.editMode){
      this.edit()
    }
    else {
      this.save()
    }
  }

  getProduct(){
    const category = new Category(this.formGroup.controls.category.value,null,null,null)
    return new Product(
      this.formGroup.controls.uuid.value,
      this.formGroup.controls.name.value,
      this.formGroup.controls.description.value,
      category,
      0,
      0,
      this.formGroup.controls.price.value,
      this.formGroup.controls.mainImage.value,
      [],
      this.formGroup.controls.active.value,
      [])
  }
}
