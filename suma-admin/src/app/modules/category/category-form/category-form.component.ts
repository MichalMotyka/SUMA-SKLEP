import {Component, Inject} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, OperatorFunction, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category, CategoryService} from "../../../core/service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Response} from "../../../core/model/response.model";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {


  formGroup = new FormGroup({
    uuid: new FormControl({value: '', disabled: true}),
    name: new FormControl('',Validators.required),
    superCategory: new FormControl(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Category,viewMode:boolean,editMode:boolean},private categoryService:CategoryService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    this.viewMode = data.viewMode
    this.editMode = data.editMode
    if (data.viewMode || data.editMode){
      this.formGroup.get("uuid")?.setValue(data.row.uuid)
      this.formGroup.get("name")?.setValue(data.row.name)
      this.formGroup.get("superCategory")?.setValue(data.row.supercategory)
    }
    if (data.viewMode) {
      this.formGroup.get("name")?.disable()
      this.formGroup.get("superCategory")?.disable()
    }
      categoryService.getCategory("CATEGORY",false,"").subscribe(value => {
        value.forEach(cateories =>{
          this.category.push({value:cateories.uuid,viewValue:cateories.name})
        })
      })


  }

  category: any[] = [];
  viewMode: boolean;
  editMode:boolean;
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.uuid == object2.uuid;
  }

  save() {
    this.categoryService.saveCategory(this.getCategory())
      .pipe(
        catchError((error: any) => {
          if (error.status === 400) {
            return throwError(error.error);
          } else {
            return throwError(error.message);
          }
        })
      )
      .subscribe(response => {
        if (response.code === 'SUCCESS') {
          this.toaster.success("Pomyślnie utworzono kategorię", "Sukces", {
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
      this.categoryService.editCategory(this.getCategory()).pipe(
        catchError((error: any) => {
          if (error.status === 400) {
            return throwError(error.error);
          } else {
            return throwError(error.message);
          }
        })
      )
        .subscribe(response => {
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

  getCategory(){
    return new Category(
      this.formGroup.controls.uuid.value,
      this.formGroup.controls.name.value,
      [],
      this.formGroup.controls.superCategory.value,
    )
  }

  commit() {
    if(this.editMode){
      this.edit()
    }else{
      this.save()
    }
  }
}
