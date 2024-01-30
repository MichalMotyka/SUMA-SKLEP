import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./modules/login/login.component";
import {SidebarComponent} from "./modules/main-nav/sidebar/sidebar.component";
import {MatListModule} from "@angular/material/list";
import {PanelComponent} from "./modules/panel/panel.component";
import {UserComponent} from "./modules/user/user.component";
import {CategoryComponent} from "./modules/category/category.component";
import {ProductComponent} from "./modules/product/product.component";

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"panel",component:PanelComponent,children:[
      {path:"uzytkownicy",component:UserComponent},
      {path:"kategorie",component:CategoryComponent},
      {path:"produkty",component:ProductComponent},
    ]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes), MatListModule],
    declarations: [
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
