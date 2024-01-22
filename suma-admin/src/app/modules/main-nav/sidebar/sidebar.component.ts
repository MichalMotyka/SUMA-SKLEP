import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


class MenuElements {
  name: string = '';
  rout: string = '';

  constructor(name: string, rout: string) {
    this.name = name;
    this.rout = rout;
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  elements: MenuElements[] = [
    new MenuElements("Użytkownicy", "uzytkownicy"),
    new MenuElements("Kategorie", "kategorie"),
];
  name!: string
  roleName!: string;

  constructor(private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  logout() {
    //TODO Usuwanie cookie oraz przekierowanie na okno z logowaniem
  }

  validatePermision(name: string) {
    // if (name == 'admin' && (this.userController.getRoleByName("countryList") || this.userController.getRoleByName("usersGetAll") || this.userController.getRoleByName("adresList") || this.userController.getRoleByName("meterGet"))) {
    //   return true;
    // }
    // return this.userController.getRoleByName(name)?.active
    return true
  }

  runModule(operaion: string) {
    if (operaion == "Użytkownicy") {
      this.router.navigate(["panel/uzytkownicy"])
    } else if (operaion == "Kategorie1") {
      //this.dialog.open(AdministratorComponent)
    } else if (operaion == "Kategorie") {
      this.router.navigate(["panel/kategorie"])
    } else if (operaion == "Taryfa") {
      this.router.navigate(["main/tariff"])
    } else if (operaion == "Cennik") {
      this.router.navigate(["main/price"])
    } else if (operaion == "Umowy") {
      this.router.navigate(["main/contract"])
    } else if (operaion == "Zlecenie OT") {
      this.router.navigate(["main/ot_list"])
    } else if (operaion == "Odczyty") {
      this.router.navigate(["main/readings"])
    }
  }


}
