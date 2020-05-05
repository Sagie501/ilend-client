import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'ile-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input() product: Product;
  @ViewChild('imagesSlider') imagesSlider: NgImageSliderComponent;
  images: Array<{ thumbImage: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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

  prevImage() {
    this.imagesSlider.prev();
  }

  nextImage() {
    this.imagesSlider.next();
  }

  navigateToProductPage() {
    this.router.navigate([this.product.id], { relativeTo: this.activatedRoute });
  }
}
