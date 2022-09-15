import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightStats]',
})
export class HighlightStatsDirective implements OnInit {
  @Input() defaultColor: string = 'white';
  @Input() highlightColor: string = '#ffd740';

  @HostBinding('style.color') color: string = this.defaultColor;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover() {
    this.color = this.highlightColor;
    this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave') mouseleave() {
    this.color = this.defaultColor;
  }
}
