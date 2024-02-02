import { Injectable } from '@angular/core';
import {CategoryDTO} from "./category.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Response} from "../model/response.model";




export class Product{
    constructor(public uuid: string,
                public name: string | null,
                public description: string | null,
                public category: string | null,
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
    return this.http.post<Response>(`${environment.url}/api/v1/product`,product,{withCredentials:true})
  }
}
