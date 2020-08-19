import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
require('highcharts/themes/grid-light')(Highcharts);
import { getLastSevenDays } from '../../helpers/last-seven-days.helper';

@Component({
  selector: 'ile-data-diagram',
  templateUrl: './data-diagram.component.html',
  styleUrls: ['./data-diagram.component.less'],
})
export class DataDiagramComponent implements OnInit {
  @Input() data: number[];
  @Input() title: string;
  @Input() prefix: string;
  @Input() suffix: string;

  chartOptions: Highcharts.Chart;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    setTimeout(() => {
      this.chartOptions = new Highcharts.Chart({
        chart: {
          renderTo: `diagram-${this.title}`,
          type: 'spline',
        },
        title: {
          text: this.title,
        },
        yAxis: {
          title: {
            text: '',
          },
        },
        xAxis: {
          title: {
            text: '',
          },
          categories: getLastSevenDays(),
        },

        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: this.suffix,
          valuePrefix: this.prefix,
        },
        series: [this.getSeries()],
      });
    }, 0);
  }

  getSeries(): Highcharts.SeriesOptionsType {
    return {
      name: this.title,
      type: 'line',
      data: this.data,
      color: '#2d8eff',
    } as Highcharts.SeriesOptionsType;
  }
}
