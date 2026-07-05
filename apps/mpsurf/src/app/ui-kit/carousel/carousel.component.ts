/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate,style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  imports: [NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('carousalAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(
          '300ms ease-in',
          style({
            transform: 'translateX(0%)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({
            transform: 'translateX(-100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {

  images = input.required<CarouselImage[]>()
  indicators = input<boolean>(true)

  selectedIndex = 0;

  ngOnInit(): void {
    this.autoSlideImages();
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  autoSlideImages(): void {
    setInterval(() => {
      this.selectedIndex < this.images().length - 1
        ? this.selectedIndex++
        : (this.selectedIndex = 0);
    }, 3000);
  }

}
