import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
// @ts-ignore
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserForm implements OnInit {
  @ViewChild("pesel") peselInput!:ElementRef;
  public model: any;
  public concratorModel:any;
  nip="";
  pesel="";
  numerKlienta!:string;
  ulica!:string;
  ulicaKores!:string;
  nazwa: any;
  saldo: any;
  ppe!:string
  states:string[] = [];
  dic:any [][] = []
  viewMode!:boolean;
  formGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    adres: new FormControl('',Validators.required),
    ul: new FormControl('',Validators.required),
    koresadres: new FormControl('',Validators.required),
    koresul: new FormControl('',Validators.required)
  })

  formatter = (result: string) => result.toUpperCase();

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:any,viewMode:boolean,editMode:boolean},private toaster:ToastrService,private dialog:MatDialogRef<any>) {

  }

  ngOnInit(): void {
  }

  save(){
    // let adres:any;
    // let adresKores:any;
    // this.dic.find(value => value[0] == this.model ? adres = value[1] : adres="");
    // this.dic.find(value => value[0] == this.concratorModel ? adresKores = value[1] : adresKores = "");
    // if (adres !=""  && adresKores != "") {
    //   this.kontrahenService.save(new Kontrahent(0, this.numerKlienta,this.nazwa, this.pesel, this.nip, "N", 0.00, adres, this.ulica, adresKores, this.ulicaKores,this.ppe,"T")).subscribe(
    //     value => {
    //       if (value.status == 201){
    //         this.toaster.success("Pomyślnie utworzono kontrahenta","Sukces", {
    //           timeOut: 3000,
    //           progressBar: true,
    //           progressAnimation: "decreasing"
    //         })
    //         this.dialog.close(this);
    //       }else if(value.status == 200){
    //         this.toaster.success("Pomyślnie zmieniono dane kontrahenta","Sukces", {
    //           timeOut: 3000,
    //           progressBar: true,
    //           progressAnimation: "decreasing"
    //         })
    //         this.dialog.close(this);
    //       }else{
    //         this.toaster.error("Nie udało się utworzyć kontrahenta","Błąd", {
    //           timeOut: 3000,
    //           progressBar: true,
    //           progressAnimation: "decreasing"
    //         })
    //       }
    //     }
    //   )
    // }else {
    //   this.toaster.error("Wybrana wartość adresu nie istnieje, proszę wybrać ją ze słownika","Błąd", {
    //     timeOut: 3000,
    //     progressBar: true,
    //     progressAnimation: "decreasing"
    //   })
    // }
  }


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );




  onPeselCheanged(nipInput: HTMLInputElement) {
    if(this.pesel.length >0){
      nipInput.disabled = true;
      this.nip = "";
    }else {
      nipInput.disabled = false;
    }
  }

  onNipCheanged(peselInput: HTMLInputElement) {
    if(this.nip.length >0){
      peselInput.disabled = true;
      this.pesel = "";
    }else{
      peselInput.disabled = false;
    }
  }
}
