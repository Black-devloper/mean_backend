import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-zone4',
  templateUrl: './zone4.component.html',
  styleUrls: ['./zone4.component.css']
})
export class Zone4Component implements OnInit {
  address: string;


  constructor(  private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) { }

  geoCoder: google.maps.Geocoder;
   public lat: number;
 public  lng: number;
  zoom = 12;
  null: boolean;


  @ViewChild('search', { static: false})
  public searchElementRef: ElementRef;
  found = '';
  polygonArray: any;




  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    // autocomplete searchbox
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log('A', this.lat, this.lng);
          this.zoom = 12;
          this.inPolygon();
        });
      });
    });
  }



  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        alert(event.overlay.getPath().getArray());
        this.polygonArray = new google.maps.Polygon({paths: [event.overlay.getPath().getArray()]});
        console.log('Pa', this.polygonArray);
      }
    });
  }

  inPolygon() {
    console.log('poly');
    const place1 = new google.maps.LatLng(this.lat, this.lng);
    console.log(place1);
    if (google.maps.geometry.poly.containsLocation(place1, this.polygonArray)) {
      this.found = 'true';
      console.log('true');
    } else {
      this.found = 'false';
      console.log('false');

    }
  }

// currente location set on map
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
       }

    });
  }


}





