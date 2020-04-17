import { Injectable } from '@angular/core';
import { Leasing } from '../../models/leasing.model';
import { LeasingStatusFromServer } from 'src/app/shared/components/order-status/order-status.component';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root',
})
export class LeasingService {
  leasings: Leasing[];
  pendingLeasings: Leasing[];

  constructor() {}

  getLeasings() {
    if (this.leasings) {
      return this.leasings;
    }

    let amount = Math.floor(Math.random() * 30);
    let leasings: Partial<Leasing>[] = [];

    for (let index = 0; index < amount; index++) {
      leasings.push({
        leasingID: Math.floor(Math.random() * 95635321).toString(),
        status: this.randomEnum(LeasingStatusFromServer),
        product: {
          name: faker.commerce.productName(),
          requestedPrice: faker.commerce.price(),
        } as Product,
        startDate: faker.date.past(),
        lessee: {
          firstName: faker.name.firstName(),
          lastName: faker.name.firstName(),
        } as User,
        lessor: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        } as User,
      });
    }

    this.leasings = leasings as Leasing[];
    return leasings as Leasing[];
  }

  getPendingLeasings() {
    if (this.pendingLeasings) {
      return this.pendingLeasings;
    }

    let amount = Math.floor(Math.random() * 4);
    let leasings: Partial<Leasing>[] = [];

    for (let index = 0; index < amount; index++) {
      leasings.push({
        leasingID: Math.floor(Math.random() * 95635321).toString(),
        status: LeasingStatusFromServer.WAITING_FOR_APPROVE,
        product: {
          name: faker.commerce.productName(),
          pictureLink: this.getImages(),
          requestedPrice: faker.commerce.price(),
        } as Product,
        startDate: faker.date.past(),
        lessee: {
          firstName: faker.name.firstName(),
          lastName: faker.name.firstName(),
        } as User,
        lessor: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        } as User,
      });
    }

    this.pendingLeasings = leasings as Leasing[];
    return leasings as Leasing[];
  }

  randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

  getImages() {
    let amount = Math.floor(Math.random() * 3) + 1;
    let images = [];

    for (let index = 0; index < amount; index++) {
      images.push(
        `https://loremflickr.com/${(
          Math.floor(Math.random() * 8) * 100 +
          100
        ).toString()}/${(Math.floor(Math.random() * 8) * 100 + 100).toString()}`
      );
    }

    return images;
  }
}
