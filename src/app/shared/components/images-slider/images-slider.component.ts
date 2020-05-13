import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'ile-images-slider',
  templateUrl: './images-slider.component.html',
  styleUrls: ['./images-slider.component.less']
})
export class ImagesSliderComponent implements OnInit, OnChanges {

  @Input() images: Array<string>;
  @Input() imageHeight: number;
  @Input() imageWidth: string;
  @ViewChild('imagesSlider') imagesSlider: NgImageSliderComponent;
  thumbImages: Array<{ thumbImage: string }> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.images && changes.images.currentValue) {
      this.thumbImages = this.images.map((link) => {
        return {
          thumbImage: link
        };
      });
    }
  }

  prevImage() {
    this.imagesSlider.prev();
  }

  nextImage() {
    this.imagesSlider.next();
  }
}
