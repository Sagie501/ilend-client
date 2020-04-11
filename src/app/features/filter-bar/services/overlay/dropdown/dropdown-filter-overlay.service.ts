import {
  Injectable,
  ElementRef,
  Injector,
  InjectionToken,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DropdownFilterOverlayComponent } from '../../../components/dropdown-filter-overlay/dropdown-filter-overlay.component';
import {
  DROPDOWN_DIALOG_DATA,
  DROPDOWN_DIALOG_CALLBACK,
} from '../../../consts';
import { Option } from '../../../models/options.model';
import { DropdownFilter } from '../../../models/dropdown-filter.model';
import { FilterOverlayService, FilterOverlayConfig } from '../overlay.model';

interface DropdownFilterOverlayConfig extends FilterOverlayConfig {
  data?: Option[];
  callback?: (change: DropdownFilter) => void;
}

@Injectable({
  providedIn: 'root',
})
export class DropdownFilterOverlayService extends FilterOverlayService {

  constructor(overlay: Overlay, injector: Injector) {
    super(overlay, injector);
  }

  protected getComponentPortal(injector: PortalInjector): ComponentPortal<DropdownFilterOverlayComponent> {
    return new ComponentPortal(
      DropdownFilterOverlayComponent,
      null,
      injector
    );
  }

  protected createInjector(config: DropdownFilterOverlayConfig): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(DROPDOWN_DIALOG_DATA, config.data);
    injectionTokens.set(DROPDOWN_DIALOG_CALLBACK, config.callback);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  protected getSpecificOverlayConfig(
    config: DropdownFilterOverlayConfig
  ) {
    const overlayConfig = {
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '25rem',
      height: '15rem',
    };

    return overlayConfig;
  }
}
