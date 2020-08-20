import { Injectable } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Leasing } from 'src/app/core/models/leasing.model';

@Injectable({
  providedIn: 'root',
})
export class AdminDiagramService {
  constructor(private leasingService: LeasingService) {}

  getLeasingsDiagramData() {
    return this.leasingService
      .getAllLeasings()
      .pipe(
        map(this.filterLeasingsByDates),
        map(this.sortDates),
        map(this.summarizeLeasings.bind(this))
      );
  }

  getEaningsDiagramData() {
    return this.leasingService
      .getAllLeasings()
      .pipe(
        map(this.filterUnpaidLeasings),
        map(this.filterLeasingsByDates),
        map(this.sortDates),
        map(this.summarizeLeasingsPrice.bind(this))
      );
  }

  getLatestTransactions() {
    return this.leasingService.getAllLeasings().pipe(
      map(this.filterUnpaidLeasings),
      map(this.sortDates),
      map((leasings: Leasing[]) => leasings.slice(0, 5))
    );
  }

  filterLeasingsByDates(leasings: Leasing[]) {
    let lastSevenDaysStart = moment().startOf('day').subtract(1, 'week');
    let thisDay = moment().endOf('day');

    return _.filter(leasings, (leasing: Leasing) => {
      return moment(leasing.creationDate).isBetween(
        lastSevenDaysStart,
        thisDay
      );
    });
  }

  filterUnpaidLeasings(leasings: Leasing[]) {
    return _.filter(
      leasings,
      (leasing: Leasing) => leasing.transactionId && leasing.total_price
    );
  }

  sortDates(leasings: Leasing[]) {
    return leasings.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    );
  }

  summarizeLeasings(leasings: Leasing[]) {
    let summarizedArray = this.getLastSevenDays();

    leasings.forEach((leasing) => {
      summarizedArray[leasing.creationDate.getDate().toString()] += 1;
    });

    return Object.values(summarizedArray);
  }

  summarizeLeasingsPrice(leasings: Leasing[]) {
    let summarizedArray = this.getLastSevenDays();

    leasings.forEach((leasing) => {
      summarizedArray[leasing.creationDate.getDate().toString()] +=
        leasing.total_price;
    });

    return Object.values(summarizedArray);
  }

  getLastSevenDays(): Object {
    let summarizedArray = {};

    for (let i = 0; i < 7; i++) {
      summarizedArray[
        moment().startOf('day').subtract(i, 'day').date().toString()
      ] = 0;
    }

    return summarizedArray;
  }
}
