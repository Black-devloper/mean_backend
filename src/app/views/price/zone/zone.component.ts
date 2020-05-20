import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {  Task1Service } from '../Service/task-1.service';
import { FormControl , FormBuilder , FormGroup } from '@angular/forms';
import { Task6Service } from '../Service/task-6.service';
import { HttpClient } from '@angular/common/http';
import { google } from 'google-maps';
declare var google : google;

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  address: string;
  geoCoder: google.maps.Geocoder;
   public lat: number;
 public  lng: number;
  zoom = 12;
  null: boolean;

  f: FormGroup;

  public searchElementRef: ElementRef;
  public  multipleData: any = [];
  found = '';
  polygonArray: any;
  cntName:[];
  countries: any = [];
  cname:string;
  name = new FormControl('');
  Zonename: any;
  ZoneData: any=[];

  constructor(  private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private http: HttpClient ,
                private ngZone: NgZone, private countryServise: Task1Service , private mapService: Task6Service ) { }



  @ViewChild('search', { static: false})





  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    this.countryServise.onReadEmployee();
    this.countryServise.countryName.subscribe(cnm => {
      this.cntName = cnm;
      console.log(this.cntName, 'past country');
    });


    this.f = this.fb.group({
      name: null,

    });


    // autocomplete searchbox
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const cname: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (cname.geometry === undefined || cname.geometry === null) {
            return;
          }
          this.lat = cname.geometry.location.lat();
          this.lng = cname.geometry.location.lng();
          console.log('A', this.lat, this.lng);
          this.zoom = 12;
          this.inPolygon();
        });
      });
    });
  }


  randomColor() {
   var color = Math.floor(0*1000000 * Math.random()).toString(16);
   return '#' + ('000000' + color).slice(-6);
  }


  onMapReady(map) {
    console.log('c');
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    console.log('d');
    const options: any = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        fillColor: this.randomColor(),
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
        for ( let i = 0 ; i < len ; i++ ) {
          soloData.push( new google.maps.LatLng(val.getAt(i).lat(), val.getAt(i).lng()));
        }
        this.polygonArray = new google.maps.Polygon({paths: [event.overlay.getPath().getArray()]});
        console.log('Pa', this.polygonArray);
        this.multipleData.push({
          name : polyName,
          coordinates: soloData,
          color: this.randomColor()
        });
      }

      this.drawPolygon(map);
      this.found = 'null';
    });
  }

  onAddEmployee() {
    const data = {
      cname: this.cname,
      zonedata: this.multipleData
    }
    console.log(data, 'alldata' );
    // this.mapService.onAddEmployee(data);

  }


  drawPolygon(map) {
    console.log('d');
    console.log(this.multipleData);
    for ( let i = 0; i < this.multipleData.len ; i++) {
      const bt = new google.maps.Polygon({
        paths: this.multipleData[i].coordinates,
        strokeColor: this.multipleData[i].col,
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: this.multipleData[i].col,
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

getZone() {
  // this.mapService.onReadEmployee(this.countries);
}


// tslint:disable-next-line: ban-types
onSelectCountry(event: any) {
  console.log('select');
  this.cname = event.target.value;
  // console.log(this.cname);
  // console.log(this.cntName);
  this.multipleData = [];

  for (let i = 0; i < this.cntName.length; i++) {
  //   // console.log(this.cntName[i])
  // if(this.cname === this.cntName[i].name)
  // {
  //   this.lat = this.cntName[i].lat;
  //   this.lng = this.cntName[i].lng;
  //   this.zoom = 4;
    console.log('india');
    break;
  }
 }
//   this.mapService.onReadEmployee(this.cname).subscribe(data => {
//    console.log(data);
//    this.multipleData = data;
//  });
// }




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
  getAddress(latitude , longitude) {
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






