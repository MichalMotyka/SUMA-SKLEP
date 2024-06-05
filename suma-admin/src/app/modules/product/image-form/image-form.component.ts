import {Component, Inject, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../core/service/category.service";
import {ToastrService} from "ngx-toastr";
import {Image, Product, ProductService} from "../../../core/service/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Image>;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'action'];
  selectedFile: File | undefined;
  productUuid: string | null;

  constructor(@Inject(MAT_DIALOG_DATA) data: { row: Category }, private http: HttpClient, private toaster: ToastrService, private productService: ProductService, private dialog: MatDialogRef<any>) {
    this.productUuid = data.row.uuid
    this.productService.getProductByUuid(this.productUuid).subscribe({
      next: value => {
        const images:Image[] = []
        value.images.forEach(image=>{
          images.push(new Image(image))
        })
        this.dataSource = new MatTableDataSource(images);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.toaster.error("Nie wskazano pliku!", "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
      return;
    }

    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.productService.addImage(fd, this.productUuid)
      .subscribe(res => {
        this.toaster.success("Pomyślnie dodano grafikę", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.close(this);
      }, error => {
        this.toaster.error(error.message, "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      });
  }

  remove(row: any) {
    this.productService.removeImage(this.productUuid, row.uuid).subscribe(res => {
      this.toaster.success("Pomyślnie usunięto grafikę", "Sukces", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
      this.dialog.close(this)
    }, error => {
      this.toaster.error(error.message, "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }
}
