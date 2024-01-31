import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  items = Array.from({length: 10}).map((_, i) => `Item #${i}`);

  onFileSelected($event: Event) {

  }
}
