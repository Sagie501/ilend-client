import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PriceFilterOverlayService, PriceFilterOverlayConfig } from '../../services/overlay/price/price-filter-overlay.service';
import { Product } from 'src/app/core/models/product.model';
import { PriceFilter } from '../../models/price-filter.model';
import { PricesService } from '../../services/prices/prices.service';

@Component({
  selector: 'ile-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.less']
})
export class PriceFilterComponent implements OnInit {

  @Input() products: Product[];
  @Input() currentMinimum: number;
  @Input() currentMaximum: number;

  @Output() changed: EventEmitter<PriceFilter> = new EventEmitter();

  @ViewChild('price') price: ElementRef;

  constructor(private priceFilterOverlayService: PriceFilterOverlayService, private pricesService: PricesService) { }

  ngOnInit(): void {
  }

  openOverlay() {
    let priceRanges = this.pricesService.getPricesRanges(this.products);
    this.priceFilterOverlayService.open(
      {
        data: priceRanges,
        currentMinimum: /*this.currentMinimum*/0,
        currentMaximum: /*this.currentMaximum*/priceRanges.length,
        jumpValue: this.pricesService.getJumpValue(this.products),
        callback: (change: PriceFilter) => this.changed.emit(change),
      } as PriceFilterOverlayConfig,
      this.price
    );
  }

}
