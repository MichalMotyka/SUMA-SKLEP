import { Injectable } from '@angular/core';
import {RoleClass, User, UserClass} from "./users.service";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {


  username!:string
  roles!: RoleClass[]
  constructor() { }

  public setUserData(user: UserClass){
    this.username = user.login;
    this.roles = user.role;
  }

  public getRoleByName(name:string){
    return this.roles.find(value => value.name == name);
  }
}
