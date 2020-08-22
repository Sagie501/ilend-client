import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
require('highcharts/themes/grid-light')(Highcharts);
import { getLastSevenDays } from '../../helpers/last-seven-days.helper';
import { Store } from '@ngrx/store';
import {
  LayoutState,
  getCurrentTheme,
  Theme,
} from 'src/app/core/reducers/layout.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ile-data-diagram',
  templateUrl: './data-diagram.component.html',
  styleUrls: ['./data-diagram.component.less'],
})
export class DataDiagramComponent implements OnInit, OnDestroy {
  @Input() data: number[];
  @Input() title: string;
  @Input() prefix: string;
  @Input() suffix: string;

  chartOptions: Highcharts.Chart;

  subscriptions: Subscription[];
  color = '#201265';

  constructor(private store: Store<LayoutState>) {
    this.subscriptions = [
      this.store.select(getCurrentTheme).subscribe((theme) => {
        this.color = theme === Theme.LIGHT ? '#201265' : '#06025e';
        this.createChart(this.color);
      }),
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges() {
    this.createChart(this.color);
  }

  createChart(color) {
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
        series: [this.getSeries(color)],
      });
    }, 0);
  }

  getSeries(color: string): Highcharts.SeriesOptionsType {
    return {
      name: this.title,
      type: 'line',
      data: this.data,
      color: color,
    } as Highcharts.SeriesOptionsType;
  }
}
