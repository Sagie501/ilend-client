import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'ile-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.less'],
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
