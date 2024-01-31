import { Injectable } from '@angular/core';
import {CategoryDTO} from "./category.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";




export class Product{
  constructor(public uuid:string,
              public name:string,
              public description:string,
              public category:CategoryDTO,
              public available:number,
              public count:number,
              public price:number,
              public mainImg:string,
              public images:string[],
              public active:boolean) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public createProduct(product:Product){
    this.http.post(`${environment.url}/api/v1/product`,product,{withCredentials:true})
  }
}
