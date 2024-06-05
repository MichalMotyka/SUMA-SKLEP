import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../core/service/category.service";
import {ProductService} from "../../../core/service/product.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  nazwa: string | null = ''
  uuid: string | null = ''
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Category,viewMode:boolean,editMode:boolean},private toaster:ToastrService,private dialog: MatDialogRef<any>,private productService:ProductService) {
    this.nazwa = data.row.name
    this.uuid = data.row.uuid
  }

  remove() {
    this.productService.deleteProduct(this.uuid).subscribe(value => {
      this.toaster.success("Pomyślnie usunięto produkt", "Sukces", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    },error => {
      this.toaster.error(error, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
    this.dialog.close(this)
  }

  close() {
    this.dialog.close(this)
  }
}
