import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {Category} from "../../core/service/category.service";
import {CategoryFormComponent} from "../category/category-form/category-form.component";
import {Subscription} from "rxjs";
import {ProductFormComponent} from "./product-form/product-form.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','actions'];
  formModule: any = ProductFormComponent;
  private subcription!: Subscription;
  private searchSub!: Subscription;

  remove(row:any) {

  }

  view(row:any) {

  }

  edit(row:any) {

  }
}
