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
    new MenuElements("Produkty", "produkty"),
    new MenuElements("Wydania/Przyjęcia", 'magazyn'),
    new MenuElements("Zamówienia", 'zam')
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
    switch (operaion){
      case "Użytkownicy":
        this.router.navigate(["panel/uzytkownicy"])
        break
      case "Kategorie":
        this.router.navigate(["panel/kategorie"])
        break
      case "Produkty":
        this.router.navigate(["panel/produkty"])
        break
      case "Wydania/Przyjęcia":
        this.router.navigate(["panel/magazyn"])
        break
      case "Zamówienia":
        this.router.navigate(["panel/zamowienia"])
        break
    }
  }
}
