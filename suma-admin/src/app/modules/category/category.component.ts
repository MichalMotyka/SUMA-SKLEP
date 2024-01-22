import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {UserClass} from "../../core/service/users.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../core/utils/shared/shared.service";
import {Category, CategoryService} from "../../core/service/category.service";
import {UserForm} from "../user/user-form/user-form.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {CategoryDeleteComponent} from "./category-delete/category-delete.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','actions'];
  formModule: any = CategoryFormComponent;
  private subcription!: Subscription;
  private searchSub!: Subscription;

  constructor(private dialog:MatDialog, private sharedService: SharedService,private categoryService:CategoryService) {
    this.searchSub = this.sharedService.getClieckEvent().subscribe(value => {
      if (value != '' && value != undefined) {
        this.categoryService.getCategory("ALL",false,"").subscribe(value =>{
          this.dataSource = new MatTableDataSource(value);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
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
    this.subcription = this.categoryService.getCategory("ALL",false,"").subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  view(row:any) {
    this.dialog.open(CategoryFormComponent,{data:{row:row,viewMode:true,editMode:false}})
  }
  edit(row:any) {
    this.dialog.open(CategoryFormComponent,{data:{row:row,viewMode:false,editMode:true}})
  }

  remove(row:any) {
    this.dialog.open(CategoryDeleteComponent,{data:{row:row,viewMode:false,editMode:true}})
  }
}
