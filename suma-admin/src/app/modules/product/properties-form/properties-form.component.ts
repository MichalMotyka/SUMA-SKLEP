import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Image, Product, ProductService} from "../../../core/service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../core/service/category.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss']
})
export class PropertiesFormComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<String>;
  dataSource: any;
  displayedColumns = ['name','value', 'action'];
  selectedFile: File | undefined;
  productId:string | null
  formGroup =  new FormGroup({
    name: new FormControl('',Validators.required),
    value: new FormControl('',Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Product,viewMode:boolean,editMode:boolean},private toaster:ToastrService,private productService:ProductService,private dialog:MatDialogRef<any>) {
    this.productId = data.row.uuid
    this.dataSource = new MatTableDataSource(data.row.properties);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  remove(row:any) {
    const index = this.dataSource._data.value.indexOf(row)
    const arr =this.dataSource._data.value
    if (index > -1){
      arr.splice(index,1)
    }
    const product = new Product(this.productId,null,null,null,0,0,null,null,[],null,arr)
    this.productService.updateProperties(product).subscribe(value => {
      this.toaster.success("Pomyślnie zmodyfikowano parametry", "Sukces", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
      this.dialog.close(this);
    },error => {
      this.toaster.error("Nie udało się zmienić danych skontaktuj się z administratorem", "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }

  add(){
    if (this.dataSource._data.value.length < 6){
      const propList:[any] = this.dataSource._data.value
      propList.push({name:this.formGroup.controls.name.value,value:this.formGroup.controls.value.value,uuid:null})
      const product = new Product(this.productId,null,null,null,0,0,null,null,[],null,propList)
      this.productService.updateProperties(product).subscribe(value => {
        this.toaster.success("Pomyślnie zmodyfikowano parametry", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.close(this);
      },error => {
        this.toaster.error("Nie udało się zmienić danych skontaktuj się z administratorem", "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      })
      return
    }
    this.toaster.error("Osiągnięto maksymalną ilość parametrów dla wskazanego produktu!", "Błąd", {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: "decreasing"
    })
  }
}
