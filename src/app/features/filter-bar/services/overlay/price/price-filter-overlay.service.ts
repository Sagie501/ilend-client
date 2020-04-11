import { Injectable, Injector } from '@angular/core';
import { FilterOverlayService, FilterOverlayConfig } from '../overlay.model';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { PriceFilter } from '../../../models/price-filter.model';
import { PRICE_DIALOG_DATA, PRICE_DIALOG_MINIMUM, PRICE_DIALOG_MAXIMUM, PRICE_DIALOG_CALLBACK, PRICE_DIALOG_JUMP } from '../../../consts';
import { PriceFilterOverlayComponent } from '../../../components/price-filter-overlay/price-filter-overlay.component';
import { Overlay } from '@angular/cdk/overlay';

export interface PriceFilterOverlayConfig extends FilterOverlayConfig {
  data?: number[];
  currentMinimum: number;
  currentMaximum: number;
  jumpValue: number;
  callback?: (change: PriceFilter) => void;
}

@Injectable({
  providedIn: 'root'
})
export class PriceFilterOverlayService extends FilterOverlayService {

  constructor(overlay: Overlay, injector: Injector) {
    super(overlay, injector);
  }

  protected getComponentPortal(injector: PortalInjector): ComponentPortal<PriceFilterOverlayComponent> {
    return new ComponentPortal(
      PriceFilterOverlayComponent,
      null,
      injector
    );
  }

  protected createInjector(config: PriceFilterOverlayConfig): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(PRICE_DIALOG_DATA, config.data);
    injectionTokens.set(PRICE_DIALOG_MINIMUM, config.currentMinimum);
    injectionTokens.set(PRICE_DIALOG_MAXIMUM, config.currentMaximum);
    injectionTokens.set(PRICE_DIALOG_JUMP, config.jumpValue);
    injectionTokens.set(PRICE_DIALOG_CALLBACK, config.callback);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  protected getSpecificOverlayConfig(
    config: PriceFilterOverlayConfig
  ) {
    const overlayConfig = {
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '30rem',
      height: '15rem',
    };

    return overlayConfig;
  }
}
