import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DocumentService, OrderDTO} from "../../../core/service/document.service";
import {catchError, throwError} from "rxjs";
import {Response} from "../../../core/model/response.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent {
  order:OrderDTO
  state=''
  constructor(@Inject(MAT_DIALOG_DATA) data: {order:OrderDTO,viewMode:boolean}, private documentService:DocumentService, private toaster:ToastrService, private dialog:MatDialog) {
    this.order = data.order
    switch (this.order.state){
      case "PROJECT":
        this.state = "TOPAY"
        break
      case "TOPAY":
        this.state = "CREATED"
        break
      case "CREATED":
        this.state = "REALIZATION"
        break
      case "REALIZATION":
        this.state = "COMPLETED"
        break
      case "REJECTED":
        this.state = "PROJECT"
        break
    }
  }

  save() {
      this.documentService.updateStatus(this.order.uuid,this.state)  .pipe(
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
            this.toaster.success("Pomyślnie zmieniono status dokumentu na "+this.state, "Sukces", {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
            this.dialog.closeAll()
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
