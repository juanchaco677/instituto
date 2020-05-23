
import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Util } from 'src/app/utils/util';
import { FormBuilder } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { Localizacion } from '../modelo/localizacion';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  title = 'AGM project';
  zoom: number;
  private geoCoder;
  @Input() localizacion: Localizacion;
  @Output() emitir = new EventEmitter<Localizacion>();
  @ViewChild('search')
  public searchElementRef: ElementRef;
  formGoogle;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
  ) {

    this.localizacion = new Localizacion();
    this.formGoogle = this.formBuilder.group({
      buscar: Validacion.getCampo(true),
    });

  }


  ngOnInit() {

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.localizacion.latitud = place.geometry.location.lat();
          this.localizacion.longitud = place.geometry.location.lng();
          this.zoom = 12;
          this.emitir.emit(this.localizacion);
        });
      });
    });

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (Util.empty(this.localizacion.latitud)) {
          this.localizacion.latitud = position.coords.latitude;
          this.localizacion.longitud = position.coords.longitude;
        }
        this.zoom = 8;
        this.getAddress(this.localizacion.latitud, this.localizacion.longitud);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {

    this.localizacion.latitud = $event.coords.lat;
    this.localizacion.longitud = $event.coords.lng;
    this.getAddress(this.localizacion.latitud, this.localizacion.longitud);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.localizacion.direccion = results[0].formatted_address;
          this.localizacion.latitud = latitude;
          this.localizacion.longitud = longitude;
          this.emitir.emit(this.localizacion);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getControls(key: string) {

    return this.formGoogle.controls[key];
  }

}
