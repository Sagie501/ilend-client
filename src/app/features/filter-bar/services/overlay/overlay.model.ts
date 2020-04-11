import {
  ElementRef, Injector,
} from '@angular/core';

import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';

export interface FilterOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any;
  callback?: (change: any) => void;
}

export const DEFAULT_CONFIG: FilterOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark'
};

export abstract class FilterOverlayService {
  constructor(protected overlay: Overlay, protected injector: Injector) { }

  open(config: FilterOverlayConfig, element: ElementRef): OverlayRef {
    // Uniting the configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Creating the overlay
    const overlayRef = this.createOverlay(dialogConfig, element);

    // Creating the injector
    const injector = this.createInjector(config);

    const filterPortal = this.getComponentPortal(injector);

    overlayRef.attach(filterPortal);

    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());

    return overlayRef;
  }

  getOverlayConfig(config: FilterOverlayConfig, element: ElementRef): OverlayConfig {
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

    const specificOverlayConfig = this.getSpecificOverlayConfig(config);

    const overlayConfig = new OverlayConfig({
      ...specificOverlayConfig,
      positionStrategy
    })

    return overlayConfig;
  }

  createOverlay(
    config: FilterOverlayConfig,
    element: ElementRef
  ): OverlayRef {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config, element);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  protected abstract getSpecificOverlayConfig(config: FilterOverlayConfig): OverlayConfig;
  protected abstract getComponentPortal(injector: PortalInjector): ComponentPortal<any>;
  protected abstract createInjector(config: FilterOverlayConfig): PortalInjector;
}