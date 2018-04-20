import { OverlayRef } from '@angular/cdk/overlay';

export class SelectListOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}