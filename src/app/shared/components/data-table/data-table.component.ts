import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ile-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
})
export class DataTableComponent implements OnInit {
  @Input() titles: string[];
  @Input() data: any[];
  @Input() funcName: string;
  @Output() func: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  isDate(value: any) {
    return value instanceof Date;
  }

  isStatus(title: string) {
    return title.toLowerCase() === 'status';
  }
}
