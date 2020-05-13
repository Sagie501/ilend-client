import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ile-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() type: 'submit' | 'button' = 'button';
  @Input() disabled: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
