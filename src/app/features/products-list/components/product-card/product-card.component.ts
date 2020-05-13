import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'ile-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input() product: Product;
  images: Array<{ thumbImage: string }> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product.currentValue) {
      this.setImages();
    }
  }

  setImages() {
    this.images = this.product.pictureLinks.map((link) => {
      return {
        thumbImage: link
      };
    });
  }
}
