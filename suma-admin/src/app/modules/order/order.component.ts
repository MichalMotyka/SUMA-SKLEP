import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {DocumentForm, DocumentService} from "../../core/service/document.service";
import {OrderFormComponent} from "./order-form/order-form.component";
import {Subscription} from "rxjs";
import {SharedService} from "../../core/utils/shared/shared.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  formModule:any =  null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentForm>;
  dataSource:any;
  displayedColumns = ['uuid','data','state','actions'];
  private subcription!: Subscription;
  checkValue = 'N'
  searchValue = null

  constructor(private documentService:DocumentService,private sharedService:SharedService,private toaster:ToastrService, private dialog:MatDialog) {
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
    this.dialog.afterAllClosed.subscribe(value => {
      this.addValue(this.searchValue,this.checkValue)
    })
    this.addValue('','N')
  }

  addValue(name:string | null,all:string){
    this.subcription = this.documentService.getAllOrders(all,name).subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  view(row:any) {
    this.dialog.open(OrderFormComponent,{data:{row:row,viewMode:true},disableClose:true})
  }
}
