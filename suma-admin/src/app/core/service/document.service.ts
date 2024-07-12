import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.service";
import {environment} from "../../../environments/environment";
import {Response} from "../model/response.model";


export class DocumentForm {
  constructor(public type: string | null,
              public uuid: string | null,
              public createDate: string | null,
              public state: string | null,
              public products:Product[]) {}
}
export class DeliverDTO {
  constructor(
    public uuid: string,
    public type: string,
    public image: string,
    public price: number
  ) {}
}
export class OrderDetailsDTO {
  constructor(
    public uuid: string,
    public product: Product,
    public quantity: number,
    public pricePerUnit: number,
    public price: number
  ) {}
}
export class OrderDTO{
  constructor(
    public uuid: string,
    public createDate:string,
    public state:string,
    public name: string,
    public surname: string,
    public companyName: string,
    public nip: string,
    public homeNumber: string,
    public street: string,
    public city: string,
    public postCode: string,
    public invoicing: boolean,
    public invoicingName: string,
    public invoicingSurname: string,
    public invoicingCompanyName: string,
    public invoicingNip: string,
    public invoicingHomeNumber: string,
    public invoicingStreet: string,
    public invoicingCity: string,
    public invoicingPostCode: string,
    public email: string,
    public phoneNumber: string,
    public info: string,
    public deliver: DeliverDTO,
    public fullPrice: number,
    public fullQuantity: number,
    public ParcelLocker: string,
    public message: string,
    public payuUrl: string,
    public details: OrderDetailsDTO[]
  ) {}}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) { }

  createDocument(pm:DocumentForm){
    return this.http.post<Response>(`${environment.url}/api/v1/admin/document/create/document`,pm,{withCredentials:true})
  }

  getAll(all: string, name: string | null) {
    if(name){
      return this.http.get<DocumentForm[]>(`${environment.url}/api/v1/admin/document/get/document?all=`+all+'&name='+name,{withCredentials:true})
    }
    return this.http.get<DocumentForm[]>(`${environment.url}/api/v1/admin/document/get/document?all=`+all,{withCredentials:true})
  }

  update(uuid:string){
    return this.http.patch<Response>(`${environment.url}/api/v1/admin/document/state/document/`+uuid,null,{withCredentials:true})
  }

  delete(uuid:string){
    return this.http.delete<Response>(`${environment.url}/api/v1/admin/document/state/document/`+uuid,{withCredentials:true})
  }
  getAllOrders(all: string, name: string | null){
    if(name){
      return this.http.get<OrderDTO[]>(`${environment.url}/api/v1/admin/document/get/orders?all=`+all+'&name='+name,{withCredentials:true})
    }
    return this.http.get<OrderDTO[]>(`${environment.url}/api/v1/admin/document/get/orders?all=`+all,{withCredentials:true})
  }

  sendMessage(uuid:string,message:string){
    let order = new OrderDTO(uuid,'',"TOPAY",'','','','','','','','',false,'','','','','','','','','','','',new DeliverDTO('','','',0),0,0,'',message,'',[])
    return this.http.patch<Response>(`${environment.url}/api/v1/admin/document/send/message/orders`,order,{withCredentials:true})
  }
}
