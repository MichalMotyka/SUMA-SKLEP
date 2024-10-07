import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OrderDTO} from "../../../core/service/document.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-deliver',
  templateUrl: './order-deliver.component.html',
  styleUrls: ['./order-deliver.component.scss']
})
export class OrderDeliverComponent {
  formGroup
  order:OrderDTO
 constructor(@Inject(MAT_DIALOG_DATA) data: {order:OrderDTO}) {
    this.order = data.order
    this.formGroup = new FormGroup({
      typ: new FormControl({value:data.order.deliver.type, disabled: true}),
      parcel: new FormControl({value:data.order.parcelLocker, disabled: true}),
      number: new FormControl({value:data.order.phoneNumber,disabled:true}),
      home: new FormControl({value:data.order.homeNumber, disabled: true}),
      street: new FormControl({value:data.order.street, disabled: true}),
      city: new FormControl({value:data.order.city, disabled: true}),
      post: new FormControl({value:data.order.postCode, disabled: true})
    })
 }

}
