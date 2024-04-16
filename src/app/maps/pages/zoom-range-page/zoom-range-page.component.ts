import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
  map?: Map;
  currentCenter: LngLat = new LngLat(-74.09567130684286, 4.6340460861298425);

  ngAfterViewInit(): void {
    console.log('this.divMap', this.divMap);

    if (!this.divMap) {
      throw new Error('No divMap reference found');
    }

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: this.zoom,
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) {
      throw new Error('No map reference found');
    }

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange(value: string) {
    this.zoom = Number(value);
    this.map?.setZoom(this.zoom);
  }
}
