import {Component, ViewChild} from '@angular/core';
import {ProductFormComponent} from "../product/product-form/product-form.component";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../core/service/product.service";
import {MagazinFormComponent} from "./magazin-form/magazin-form.component";
import {DocumentForm, DocumentService} from "../../core/service/document.service";
import {SharedService} from "../../core/utils/shared/shared.service";
import {ToastrService} from "ngx-toastr";
import {CategoryFormComponent} from "../category/category-form/category-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-magazin',
  templateUrl: './magazin.component.html',
  styleUrls: ['./magazin.component.scss']
})
export class MagazinComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentForm>;
  dataSource:any;
  displayedColumns = ['typ','uuid','data','state','actions'];
  private subcription!: Subscription;
  private searchSub!: Subscription;
  formModule:any = MagazinFormComponent
  checkValue = 'N'
  searchValue = null

  constructor(private documentService:DocumentService,private sharedService:SharedService, private toaster:ToastrService, private dialog:MatDialog) {
    this.sharedService.getCheckEvent().subscribe(value => {
      if (value){
        this.checkValue = 'N'
      }else {
        this.checkValue = 'T'
      }
    })
    this.sharedService.getClieckEvent().subscribe(value => {
      this.searchValue = value
      this.addValue(this.searchValue,this.checkValue)
    })
    this.addValue('','N')
  }

  addValue(name:string | null,all:string){
    this.subcription = this.documentService.getAll(all,name).subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  remove(row:any) {
    this.documentService.delete(row.uuid).subscribe(value => {
      if (value.code === 'SUCCESS') {
        this.toaster.success("Pomyślnie anulowano dokument", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.addValue(this.searchValue,this.checkValue)
      }},error=>{
      this.toaster.error(error.message,"Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }


  view(row:any) {
    this.dialog.open(MagazinFormComponent,{data:{row:row,viewMode:true}})
  }

  update(row:any) {
    this.documentService.update(row.uuid).subscribe(value => {
      if (value.code === 'SUCCESS') {
        this.toaster.success("Pomyślnie zmieniono status dokumentu", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.addValue(this.searchValue,this.checkValue)
    }},error=>{
      this.toaster.error("Brak wystarczającej liczby produktów na magazynie","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }
}
