import { Injectable } from '@angular/core';
import {Category, CategoryDTO} from "./category.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Response} from "../model/response.model";




export class Product{
    constructor(public uuid: string,
                public name: string | null,
                public description: string | null,
                public category: Category | null,
                public available: number,
                public count: number,
                public price: string | null,
                public mainImg: string | null,
                public images: string[],
                public active: boolean | null) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public createProduct(product:Product){
    return this.http.post<Response>(`${environment.url}/api/v1/product/create`,product,{withCredentials:true})
  }

  public getAllProduct(){
    return this.http.get<Product[]>(`${environment.url}/api/v1/product/all`,{withCredentials:true})
  }

  getProductByUuid(uuid:string | null) {
    return this.http.get<Product>(`${environment.url}/api/v1/product/${uuid}`,{withCredentials:true})
  }

  editProduct(product:Product){
    return this.http.put<Response>(`${environment.url}/api/v1/product`,product,{withCredentials:true})
  }
}
