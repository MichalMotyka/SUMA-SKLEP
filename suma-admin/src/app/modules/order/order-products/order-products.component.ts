import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {DocumentForm, OrderDetailsDTO, OrderDTO} from "../../../core/service/document.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrderDetailsDTO>;
  dataSource:any;
  displayedColumns = ['product','quantity'];
  orderDetail:[OrderDetailsDTO]
  constructor(@Inject(MAT_DIALOG_DATA) data: {products:[OrderDetailsDTO]}) {
    this.orderDetail = data.products
    this.addValue()
  }

  addValue(){
      this.dataSource = new MatTableDataSource(this.orderDetail);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

  }
}
