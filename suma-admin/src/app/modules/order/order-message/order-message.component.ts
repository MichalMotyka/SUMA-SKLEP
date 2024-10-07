import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DocumentService} from "../../../core/service/document.service";
import {catchError, throwError} from "rxjs";
import {Response} from "../../../core/model/response.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-message',
  templateUrl: './order-message.component.html',
  styleUrls: ['./order-message.component.scss']
})
export class OrderMessageComponent {
  uuid:string = ''
  message:string = ''
  constructor(@Inject(MAT_DIALOG_DATA) data: {message:string,uuid:string},private dialog:MatDialog,private documentService:DocumentService, private toaster:ToastrService,private dialogref:MatDialogRef<any>) {
    this.uuid = data.uuid
    this.message = data.message
  }

  send(){
    this.documentService.sendMessage(this.uuid,this.message).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
          return throwError(error.error);
        } else {
          return throwError(error.message);
        }
      })
    ).subscribe(value => {
      if (value.code === 'SUCCESS') {
        this.toaster.success("Pomyślnie wysłano wiadomość", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll()
      }else {
        this.toaster.error(value.message, "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    },(error: Response)=>{
      this.toaster.error(error.message, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }
}
