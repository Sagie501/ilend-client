import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../../core/models/product.model';

@Component({
  selector: 'ile-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.less']
})
export class ProductsTableComponent implements OnInit {

  @Input() products: Array<Product>;
  @Output() editProductEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteProductEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
}
