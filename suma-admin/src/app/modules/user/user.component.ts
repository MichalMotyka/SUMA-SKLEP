import {Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../core/utils/shared/shared.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {UserClass, UsersService} from "../../core/service/users.service";
import {UserForm} from "./user-form/user-form.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserClass>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','actions'];
  formModule: any = UserForm;
  private subcription!: Subscription;
  private searchSub!: Subscription;

  constructor(private dialog:MatDialog, private sharedService: SharedService,private userService:UsersService) {
    this.searchSub = this.sharedService.getClieckEvent().subscribe(value => {
      if (value != '' && value != undefined) {
        this.userService.getUsers().subscribe(value =>{
          this.dataSource = new MatTableDataSource(value);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }else {
        this.addValue()
      }
    })
    dialog.afterAllClosed.subscribe(value => {
      if (this.subcription){
        this.subcription.unsubscribe;
      }
      this.addValue()
    })
  }

  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subcription = this.userService.getUsers().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  view(row:any) {
    this.dialog.open(UserForm,{data:{row:row,viewMode:true,editMode:false}})
  }
  //
  // edit(row:any) {
  //   this.dialog.open(KontrahentFormComponent,{data:{row:row,viewMode:false,editMode:true}})
  // }
  edit(row:any) {

  }
}
