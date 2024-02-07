import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserClass} from "./users.service";
import {Response} from "../model/response.model";



export interface CategoryDTO {
  uuid: string;
  name: string;
  subcategories: CategoryDTO[];
  supercategory: string;
}

export class Category {
  constructor(
    public uuid: string | null,
    public name: string | null,
    public subcategories: Category[] | null,
    public supercategory: string | null
  ) {}

}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

  }

  getCategory(type:string,bySupercategory:boolean,name:string){
    let urlString = "/api/v1/category?type="+type+"&bySupercategory="+bySupercategory
    if (name.length > 0 ){
      urlString = urlString+"&name="+name
    }
    return this.http.get<[CategoryDTO]>(`${environment.url}`+urlString,{withCredentials:true})
  }

  saveCategory(category:Category){
    return this.http.post<Response>(`${environment.url}/api/v1/category`,category,{withCredentials:true})
  }

  editCategory(category:Category){
    return this.http.patch<Response>(`${environment.url}/api/v1/category`,category,{withCredentials:true})
  }

  deleteCategory(uuid:string){
    return this.http.delete<Response>(`${environment.url}/api/v1/category/`+uuid,{withCredentials:true})
  }
}
