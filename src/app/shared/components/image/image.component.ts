import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less'],
})
export class ImageComponent implements OnInit {
  @Input() link: string;
  @Input() size: string;

  constructor() {}

  ngOnInit(): void {}
}
