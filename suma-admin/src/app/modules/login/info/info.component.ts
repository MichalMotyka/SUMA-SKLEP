import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  message: string = ''
  constructor(@Inject(MAT_DIALOG_DATA) data: {message:string}) {
    this.message = data.message;
  }

  ngOnInit(): void {
  }

}
