import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, startWith, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategoryFormComponent} from "../../category/category-form/category-form.component";
import {MagazinPickerComponent} from "../magazin-picker/magazin-picker.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../core/service/category.service";
import {Product} from "../../../core/service/product.service";
import {DocumentForm, DocumentService} from "../../../core/service/document.service";
import {ToastrService} from "ngx-toastr";
import {Response} from "../../../core/model/response.model";

@Component({
  selector: 'app-magazin-form',
  templateUrl: './magazin-form.component.html',
  styleUrls: ['./magazin-form.component.scss']
})
export class MagazinFormComponent {
  formGroup = new FormGroup({
    documentType: new FormControl('',Validators.required),
    uuid: new FormControl(''),
    data: new FormControl(''),
    state: new FormControl('')
  })
  document = ["PM","WM"]
  displayedColumns: string[] = ['Nazwa',  'Ilość','action'];
  dataSource:any
  productList:Product[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  viewMode = false
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:DocumentForm,viewMode:boolean},private dialog:MatDialog, private documents:DocumentService, private toaster:ToastrService,private dialogref:MatDialogRef<any>) {
    if (data.viewMode){
      this.viewMode = true
      this.formGroup.controls.documentType.disable()
      this.formGroup.controls.documentType.setValue( data.row.type == 'Wydanie Magazynowe' ? 'WM': 'PM')
      this.formGroup.controls.data.setValue(data.row.createDate)
      this.formGroup.controls.uuid.setValue(data.row.uuid)
      this.formGroup.controls.state.setValue(data.row.state)
      data.row.products.forEach(value => {
        this.addValue(value.uuid,value.count,value.name)
      })
    }
    this.formGroup.controls.uuid.disable()
    this.formGroup.controls.data.disable()
    this.formGroup.controls.state.disable()
    dialogref.disableClose = true;
  }

  addValue(uuid:string|null,quantity:number,name:string|null){
      const product = new Product(uuid,name,null,null,0,quantity,null,null,[],true,[])
      this.productList.push(product)
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  add() {
    const dialofRef = this.dialog.open(MagazinPickerComponent)
    dialofRef.afterClosed().subscribe(value => {
      if (value) {
        this.addValue(value.uuid,value.quantity,value.name)
      }
    })
  }

  remove(element:Product) {
    const index = this.productList.indexOf(element)
    if (index !== -1){
      this.productList.splice(index,1)
    }
    this.dataSource = new MatTableDataSource(this.productList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  close() {
    this.dialog.closeAll()
  }

  save(){
    const pm = new DocumentForm(this.formGroup.controls.documentType.value,null,null,null,this.productList)
    this.documents.createDocument(pm).pipe(
      catchError((error: any) => {
        if (error.status === 400) {
          return throwError(error.error);
        } else {
          return throwError(error.message);
        }
      })
    ).subscribe(value => {
      if (value.code === 'SUCCESS') {
        this.toaster.success("Pomyślnie utworzono dokument", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialogref.close(this);
      }else {
        this.toaster.error(value.message, "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    },(error: Response)=>{
      this.toaster.error(error.message, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }
}
