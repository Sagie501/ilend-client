import {
  Injectable,
  ElementRef,
  Injector,
  InjectionToken,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DropdownFilterOverlayComponent } from '../../components/dropdown-filter-overlay/dropdown-filter-overlay.component';
import { DROPDOWN_DIALOG_DATA, DROPDOWN_DIALOG_CALLBACK } from '../../consts';
import { Option } from '../../models/options.model';
import { DropdownFilter } from '../../models/dropdown-filter.model';

interface DropdownFilterOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: Option[];
  callback?: (change: DropdownFilter) => void;
}

const DEFAULT_CONFIG: DropdownFilterOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
};

@Injectable({
  providedIn: 'root',
})
export class DropdownFilterOverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(config: DropdownFilterOverlayConfig = {}, element: ElementRef) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig, element);

    const injector = this.createInjector(config, overlayRef);

    const dropdownFilterPortal = new ComponentPortal(
      DropdownFilterOverlayComponent,
      null,
      injector
    );

    overlayRef.attach(dropdownFilterPortal);

    overlayRef.backdropClick().subscribe((_) => overlayRef.dispose());
  }

  private createInjector(
    config: DropdownFilterOverlayConfig,
    overlayRef: OverlayRef
  ): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(DROPDOWN_DIALOG_DATA, config.data);
    injectionTokens.set(DROPDOWN_DIALOG_CALLBACK, config.callback);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private createOverlay(
    config: DropdownFilterOverlayConfig,
    element: ElementRef
  ) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config, element);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(
    config: DropdownFilterOverlayConfig,
    element: ElementRef
  ) {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 10,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      width: '20rem',
      height: '15rem',
    });

    return overlayConfig;
  }
}
