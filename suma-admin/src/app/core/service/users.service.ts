import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


export interface User {
  uuid: string;
  login: string;
  email: string;
  password: null | string;
  role: Role[];
  author: null | string;
  enabled: boolean;
  lock: boolean;
}

export interface Role {
  name: null | string;
  isActive: boolean;
  active: boolean;
}

export class UserClass implements User {
  constructor(
    public uuid: string = '',
    public login: string = '',
    public email: string = '',
    public password: null | string = null,
    public role: Role[] = [],
    public author: null | string = null,
    public enabled: boolean = false,
    public lock: boolean = false
  ) {}
}

export class RoleClass implements Role {
  constructor(
    public name: null | string = null,
    public isActive: boolean = false,
    public active: boolean = false
  ) {}
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {
  }


  getUsers(): Observable<[UserClass]>{
    return this.http.get<[UserClass]>(`${environment.url}/api/v1/auth/users`,{withCredentials:true})
  }


}
