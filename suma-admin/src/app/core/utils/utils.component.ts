import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "./shared/shared.service";

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent implements OnInit {

  @Input() module!:any
  @Input() check:boolean = false
  value!: string;
  checkValue = true
  constructor(private dialogRef: MatDialog,private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  search(){
    this.sharedService.sendClickEvent(this.value)
  }
  getCheck(){
    if (this.check){
      return
    }
  }
  add() {
    if (this.module){
      this.dialogRef.open(this.module,{data:{viewMode:false,row:this.module}})
    }
  }

  setCheck() {
    this.checkValue = !this.checkValue
    this.sharedService.sendCheckEvent(this.checkValue)
  }
}
