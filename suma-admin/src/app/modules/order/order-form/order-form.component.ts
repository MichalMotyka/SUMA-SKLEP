import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DocumentService, OrderDTO} from "../../../core/service/document.service";
import {OrderMessageComponent} from "../order-message/order-message.component";
import {OrderDeliverComponent} from "../order-deliver/order-deliver.component";
import {OrderProductsComponent} from "../order-products/order-products.component";
import {OrderConfirmComponent} from "../order-confirm/order-confirm.component";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  formGroup:any;
  invoicing = false
  message = ''
  order
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:OrderDTO,viewMode:boolean}, private dialog:MatDialog) {
    this.invoicing = data.row.invoicing
    this.message = data.row.message
    this.order = data.row
    this.formGroup = new FormGroup({
      name: new FormControl({value:data.row.name, disabled: true}),
      surname: new FormControl({value:data.row.surname, disabled: true}),
      company: new FormControl({value:data.row.companyName, disabled: true}),
      nip: new FormControl({value:data.row.nip, disabled: true}),
      home: new FormControl({value:data.row.homeNumber, disabled: true}),
      street: new FormControl({value:data.row.street, disabled: true}),
      city: new FormControl({value:data.row.city, disabled: true}),
      post: new FormControl({value:data.row.postCode, disabled: true}),
      fname: new FormControl({value:data.row.invoicingName, disabled: true}),
      fsurname: new FormControl({value:data.row.invoicingSurname, disabled: true}),
      fcompany: new FormControl({value:data.row.invoicingCompanyName, disabled: true}),
      fnip: new FormControl({value:data.row.invoicingNip, disabled: true}),
      fhome: new FormControl({value:data.row.invoicingHomeNumber, disabled: true}),
      fstreet: new FormControl({value:data.row.invoicingStreet, disabled: true}),
      fcity: new FormControl({value:data.row.invoicingCity, disabled: true}),
      fpost: new FormControl({value:data.row.invoicingPostCode, disabled: true}),
      uuid: new FormControl({value:data.row.uuid, disabled: true}),
      date: new FormControl({value:data.row.createDate, disabled: true}),
      state: new FormControl({value:data.row.state, disabled: true}),
      email: new FormControl({value:data.row.email, disabled: true}),
      phone: new FormControl({value:data.row.phoneNumber, disabled: true}),
      description: new FormControl({value:data.row.info, disabled: true})
    })
  }

  sendMessage() {
    this.dialog.open(OrderMessageComponent,{data:{message:this.message,uuid:this.formGroup.controls.uuid.value},disableClose:true})
  }
  getDeliver(){
    this.dialog.open(OrderDeliverComponent,{data:{order:this.order},disableClose:true})
  }

  getProduct() {
    this.dialog.open(OrderProductsComponent,{data:{products:this.order.details},disableClose:true})
  }

  pushState() {
    this.dialog.open(OrderConfirmComponent,{data:{order:this.order},disableClose:true})
  }
}
