import { Injectable,ComponentRef,Injector } from '@angular/core';
import {OverlayModule, Overlay, OverlayRef,ScrollStrategyOptions,OverlayConfig} from '@angular/cdk/overlay';
import { ComponentPortal,PortalInjector } from "@angular/cdk/portal";

import {SelectListOverlayComponent } from "../select-list-overlay/select-list-overlay.component";
import{SelectListOverlayRef} from "./select-list-overlay-ref"
import { FILE_PREVIEW_DIALOG_DATA } from "./select-list-overlay-tk.tokens";
interface SelectListOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: Image;
}
export interface Image {
  name: string;
  url: string;
}
const DEFAULT_CONFIG: SelectListOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
 
}
@Injectable()
export class SelectListOverlayService {

  constructor(private overlay: Overlay,private injector: Injector) { }
  open(config: SelectListOverlayConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };


    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(SelectListOverlayComponent);
// Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);
    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
    const selectListOverlayRef = new SelectListOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(_ => selectListOverlayRef.close());
    return selectListOverlayRef
  }
  private getOverlayConfig(config: SelectListOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position().connectedTo()
      // .global()
      // .centerHorizontally()
      // .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
  private createOverlay(config: SelectListOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private createInjector(config: SelectListOverlayConfig, dialogRef: SelectListOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(SelectListOverlayRef, dialogRef);
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }
  private attachDialogContainer(overlayRef: OverlayRef, config: SelectListOverlayConfig, dialogRef: SelectListOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(SelectListOverlayComponent, null, injector);
    const containerRef: ComponentRef<SelectListOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }
}

