import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-timedistance',
  templateUrl: './timedistance.component.html',
  styleUrls: ['./timedistance.component.css']
})
export class TimedistanceComponent implements OnInit {

  public lat: number;
  public lng: number;
  distance: string;
  public origin: any;
  public destination: any;



  @ViewChild('search', { static: false})
  public searchElementRef: ElementRef;




  @ViewChild('searchN', { static: false})
  public searchNElementRef: ElementRef;

  geoCoder: google.maps.Geocoder;
  zoom: number;
  address: string;
  public latN: number;
  public lngN: number;
  public maindistance: any;
  time: number;
  speed: number = 70;


   constructor(   private mapsAPILoader: MapsAPILoader,
                  private ngZone: NgZone) {

  }

  ngOnInit() {
      this.mapsAPILoader.load().then(() => {
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
            console.log(this.lat, this.lng);
            this.zoom = 12;
          });
        });
      });

      this.mapsAPILoader.load().then(() => {
        // tslint:disable-next-line: new-parens
        this.geoCoder = new google.maps.Geocoder;

        const autocompleteN = new google.maps.places.Autocomplete(this.searchNElementRef.nativeElement, {
          types: ['address']
        });

        autocompleteN.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteN.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.latN = place.geometry.location.lat();
            this.lngN = place.geometry.location.lng();

            this.getDirection();
            console.log(this.latN, this.lngN);
            this.zoom = 12;
          });

        });
      });




  }

  getDirection() {
    this.origin = {lat: this.lat, lng: this.lng },
    this.destination = {lat: this.latN , lng: this.lngN },
    console.log(this.destination);

    // tslint:disable-next-line: max-line-length
    // this.maindistance =  google.maps.geometry.spherical.computeDistanceBetween(this.origin(this.lat,this.lng),this.destination(this.latN,this.latN));
    // console.log(this.maindistance);

    this.maindistance = (google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(this.origin),
      new google.maps.LatLng(this.destination)) / 1000).toFixed(2);
      this.time = +(this.maindistance / this.speed).toFixed(2);
    console.log('ecb', this.maindistance);


  }

}
