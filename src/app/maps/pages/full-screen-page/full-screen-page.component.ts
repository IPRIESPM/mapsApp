import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    console.log('this.divMap', this.divMap);

    if (!this.divMap) {
      throw new Error('No divMap reference found');
    }

    const map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
  }
}
