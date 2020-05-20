import { Component, OnInit, NgZone, ViewChild , ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-multiplezone',
  templateUrl: './multiplezone.component.html',
  styleUrls: ['./multiplezone.component.css']
})
export class MultiplezoneComponent implements OnInit {

  address: string;

  constructor(  private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) { }

  geoCoder: google.maps.Geocoder;
   public lat: number;
 public  lng: number;
  zoom = 12;
  null: boolean;
  newColor:string;

  @ViewChild('search', { static: false})

  public searchElementRef: ElementRef;
  public  found  = '';
  polygonArray: any;
  public  multipleData: any = [];
  public Zonename: string;
  polyName: string;





  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.newColor = this.randomColor()
    console.log(this.randomColor());
    // autocomplete searchbox
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log('', this.lat, this.lng);
          this.zoom = 12;
          this.inPolygon();
        });
      });
    });
  }

  randomColor() {
    const letters = '0123456789ABCDEF';
    let col = '#';
    for (let i = 0; i < 6; i++) {
      col += letters[Math.floor(Math.random() * 16)];
    }
    return col;
  }

  onMapReady(map) {
    console.log('c');
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {

    console.log('d');
    console.log(this.newColor);
    const options: any = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        fillColor: this.newColor
        // fillColor: this.randomColor()
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      const soloData = [];
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        // alert(event.overlay.getPath().getArray());
        const len = event.overlay.getPath().getLength();
        const val = event.overlay.getPath();
        const polyName = prompt('Enter Name :');
        console.log(polyName);
        for ( let i = 0 ; i < len ; i++ ) {
          soloData.push( new google.maps.LatLng(val.getAt(i).lat(), val.getAt(i).lng()));
        }
        this.polygonArray = new google.maps.Polygon({paths: [event.overlay.getPath().getArray()]});
        console.log('Pa', this.polygonArray);
        this.multipleData.push({
          name : polyName,
          coordinates: soloData,
          color: this.newColor
        });
        this.newColor = this.randomColor();
      }

      this.drawPolygon(map);
      this.found = 'null';
    });
  }

  drawPolygon(map) {
    console.log('d');
    console.log(this.multipleData);
    for ( let i = 0; i < this.multipleData.len ; i++) {
      const bt = new google.maps.Polygon({
        paths: this.multipleData[i].coordinates,
        strokeColor: this.multipleData[i].color,
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: this.multipleData[i].color,
        fillOpacity: 0.40
      });
      bt.setMap(map);

    }
  }

  inPolygon() {
    console.log('poly');
    const place1 = new google.maps.LatLng(this.lat, this.lng);
    console.log(place1);
    console.log(this.multipleData);

    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < this.multipleData.length ; i++ ) {

      if (google.maps.geometry.poly.containsLocation(place1,
        new google.maps.Polygon({paths: [this.multipleData[i].coordinates]})))  {

        this.Zonename = this.multipleData[i].name;
        console.log(this.Zonename);
        this.found = 'true';
        break;

      } else {
        this.found = 'false';
      }

    }

  }

// currente location set on map
  private setCurrentLocation() {
    console.log('A');
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
    console.log('B');

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






