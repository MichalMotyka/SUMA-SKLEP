import { Component, Inject, OnInit } from '@angular/core';
import { Observable, startWith } from "rxjs";
import { map } from "rxjs/operators";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProductService } from "../../../core/service/product.service";
import {ToastrService} from "ngx-toastr";

interface Option {
  uuid: string | null;
  name: string | null;
}

@Component({
  selector: 'app-magazin-picker',
  templateUrl: './magazin-picker.component.html',
  styleUrls: ['./magazin-picker.component.scss']
})
export class MagazinPickerComponent implements OnInit {

  options: Option[] = [];
  filteredOptions!: Observable<Option[]>;
  selectedOption: Option | null = null; // Selected option
  uuid = ''
  formGroup = new FormGroup({
    uuid: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
  })

  constructor(public dialogRef: MatDialogRef<MagazinPickerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,private toaster:ToastrService) {
    productService.getAllProduct().subscribe(value => {
      value.forEach(product => {
        if (product.active) {
          this.options.push({ name: product.name, uuid: product.uuid })
        }
      })
    })
  }

  getOptionName(): string {
    return this.selectedOption ? this.selectedOption.name || '' : '';
  }

  onOptionSelected(uuid: string) {
    this.selectedOption = this.options.find(option => option.uuid === uuid) || null;
    // @ts-ignore
    this.formGroup.controls.uuid.setValue(this.selectedOption.name);
    this.uuid = uuid;
  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => (option.name || '').toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.filteredOptions = this.formGroup.controls.uuid.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  closeDialog(): void {
    if (this.uuid){
      const result = {
        uuid: this.uuid,
        quantity: this.formGroup.controls.quantity.value,
        name: this.selectedOption ? this.selectedOption.name || '' : ''
      };
      this.dialogRef.close(result);
    }else {
      this.toaster.error("Błedny wybór produktu", "Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    }
    }

}
