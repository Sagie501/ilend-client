import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
})
export class CheckboxComponent implements OnInit {
  @Input() isChecked: boolean;

  constructor() {}

  ngOnInit(): void {}
}
