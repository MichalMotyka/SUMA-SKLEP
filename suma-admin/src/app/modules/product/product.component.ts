import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Category, CategoryService} from "../../core/service/category.service";
import {CategoryFormComponent} from "../category/category-form/category-form.component";
import {Subscription} from "rxjs";
import {ProductFormComponent} from "./product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../core/utils/shared/shared.service";
import {Product, ProductService} from "../../core/service/product.service";
import {ImageFormComponent} from "./image-form/image-form.component";
import {PropertiesFormComponent} from "./properties-form/properties-form.component";
import {ConfirmComponent} from "./confirm/confirm.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','category','actions'];
  formModule: any = ProductFormComponent;
  private subcription!: Subscription;
  private searchSub!: Subscription;

  constructor(private dialog:MatDialog, private sharedService: SharedService, private productService:ProductService) {
    this.searchSub = this.sharedService.getClieckEvent().subscribe(value => {
      if (value != '' && value != undefined) {
        this.filteredValue(value)
      }else {
        this.addValue()
      }
    })
    dialog.afterAllClosed.subscribe(value => {
      if (this.subcription){
        this.subcription.unsubscribe;
      }
      this.addValue()
    })
  }

  addValue(){
    this.productService.getAllProduct().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  filteredValue(search:string){
    this.productService.getAllProduct().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.filter(product=>product.name?.toLowerCase()?.includes(search.toLowerCase()) || product.category?.name?.toLowerCase()?.includes(search.toLowerCase())));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  remove(row:any) {
    this.dialog.open(ConfirmComponent,{data:{row:row}})
  }

  view(row:any) {
    this.dialog.open(ProductFormComponent,{data:{row:row,viewMode:true,editMode:false}})
  }
  addImage(row:any){
    this.dialog.open(ImageFormComponent,{data:{row:row}})
  }
  edit(row:any) {
    this.dialog.open(ProductFormComponent,{data:{row:row,viewMode:false,editMode:true}})
  }

  editProperties(row:any){
    this.dialog.open(PropertiesFormComponent,{data:{row:row}})
  }
}
