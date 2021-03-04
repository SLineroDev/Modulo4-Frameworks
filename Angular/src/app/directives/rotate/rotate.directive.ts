import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img [rotate]',
})
export class RotateDirective {
  @Input() step: number = 10;
  rotationStatus: number = 0;

  @HostListener('click', ['$event']) onClick(e: any) {
    if (e.shiftKey) {
      this.rotate(-this.step);
    } else {
      this.rotate(this.step);
    }
  }
  constructor(private el: ElementRef) {}

  private rotate(step: number) {
    this.calculateRotation(this.rotationStatus, step);
    this.el.nativeElement.style.transform = `rotate(${this.rotationStatus}deg)`;
  }

  private calculateRotation(initialStatus: number, steps: number): number {
    let rawDegrees = initialStatus + steps;
    let finalDegrees = 0;
    if (rawDegrees > 360) {
      finalDegrees = initialStatus + steps - 360;
    } else if (rawDegrees < 0) {
      finalDegrees = 360 - rawDegrees;
    } else {
      finalDegrees = rawDegrees;
    }
    this.rotationStatus = finalDegrees;
    return finalDegrees;
  }
}
