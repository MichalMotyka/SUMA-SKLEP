import {Component, Inject} from '@angular/core';
import {Category, CategoryService} from "../../../core/service/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {catchError, throwError} from "rxjs";
import {Response} from "../../../core/model/response.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent {
  nazwa: any;
  uuid: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Category},private categoryService:CategoryService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    this.nazwa = data.row.name
    this.uuid = data.row.uuid
  }

  delete() {
      this.categoryService.deleteCategory(this.uuid)
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
            this.toaster.success("Pomyślnie usunięto kategorię", "Sukces", {
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
}
