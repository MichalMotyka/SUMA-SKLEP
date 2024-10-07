import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
//import {KontrahentFormComponent} from "../kontrahent-table/user-form/user-form.component";
import {HttpClient} from "@angular/common/http";
//import {CountryCreateResponse} from "../administrator/country-list/country-form/country-form.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private dialogRef: MatDialog,private http:HttpClient,private route:Router,private cookieService:CookieService) {}

  logout() {
      this.http.get<any>(`${environment.url}/api/v1/auth/logout`,{withCredentials:true}).subscribe(value => {
      })
      this.route.navigate(["/"])
  }

}
