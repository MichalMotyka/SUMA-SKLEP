import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./modules/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfoComponent} from "./modules/login/info/info.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import { PanelComponent } from './modules/panel/panel.component';
import {MainNavComponent} from "./modules/main-nav/main-nav.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {SidebarComponent} from "./modules/main-nav/sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import { UserComponent } from './modules/user/user.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsComponent} from "./core/utils/utils.component";
import {MatTableModule} from "@angular/material/table";
import {UserForm} from "./modules/user/user-form/user-form.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CategoryComponent } from './modules/category/category.component';
import { CategoryFormComponent } from './modules/category/category-form/category-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { CategoryDeleteComponent } from './modules/category/category-delete/category-delete.component';
import { ProductComponent } from './modules/product/product.component';
import { ProductFormComponent } from './modules/product/product-form/product-form.component';
import {MatButtonModule} from "@angular/material/button";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    PanelComponent,
    MainNavComponent,
    SidebarComponent,
    UserComponent,
    UtilsComponent,
    UserForm,
    CategoryComponent,
    CategoryFormComponent,
    CategoryDeleteComponent,
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll
  ],
  providers: []
})
export class AppModule { }
