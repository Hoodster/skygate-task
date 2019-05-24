import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[preventToggle]',
})
export class PreventToggleDirective {
    @Output() public preventToggle = new EventEmitter();
    constructor(private _elementRef: ElementRef) {

    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside) {
            this.preventToggle.emit(null);
        }
    }
}