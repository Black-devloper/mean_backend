import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName, FormArrayName } from '@angular/forms';
import { Task8Service } from '../../price/Service/task-8.service';
import { HttpClient } from '@angular/common/http';
import { Task9Service } from '../../price/Service/task-9.service';
import {  Task11Service } from '../Service/task-11.service';
import { Task1Service } from '../../price/Service/task-1.service';
import { Task10Service } from '../../driver/Service/task-10.service';
import { viLocale } from 'ngx-bootstrap';
import { Task7Service } from '../../user/Service/task-7.service';
declare var google: any;



import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
 import { Http} from '@angular/http';


@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  public dateTime: Date;
  public min:any=new Date();
  newcar:any=[]
  minDate = new Date();
  waypoints = [];
  public lat: number;
  public lng: number;
  zoom: number;
  address: string;
  f: FormGroup;
  handler:any = null;
  geoCoder: google.maps.Geocoder;
  public latN: number;
  public lngN: number;
  public latNew: number;
  public lngNew: number;
  public maindistance: any;
  destination: any;
  origin: { lat: any; lng: any; };
  time: number;
  speed = 70;
  requestdrivers: any[];
  driverName: [];
  tripData:any = [];
  show : boolean = false;
  elements: Elements;
  card: StripeElement;

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  settings = {
    bigBanner: true,
    format: 'MM/dd/yyyy \'at\' h:mma',
    defaultOpen: true,
    timePicker: true
};

  @ViewChild('search', { static: false})
  public searchElementRef: ElementRef;

  @ViewChild('searchN', { static: false})
  public searchNElementRef: ElementRef;
  viewDir: boolean;
  cntName: any;
  vehicle: any;
  userName: any;

  constructor( private mapsAPILoader: MapsAPILoader,private stripeService: StripeService,
               // tslint:disable-next-line: max-line-length
               private ngZone: NgZone , private fb: FormBuilder, private http: HttpClient , private employeeServise: Task11Service , private task9: Task9Service , private countryServise: Task1Service , private driverServise: Task8Service , private Task11: Task11Service,private task10: Task10Service, private task7: Task7Service) { }



  ngOnInit() {

    // this.loadStripe();

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });

    console.log(this.tripData);
    this.countryServise.onReadEmployee();
    this.countryServise.countryName.subscribe(cnm => {
      this.cntName = cnm;
      console.log(this.cntName, 'past country');
    });

    this.driverServise.getCar();
    this.driverServise.carData.subscribe(driver => {
      this.driverName = driver;
      console.log(driver);
    });

    this.task9.onReadEmployee();
    this.task9.vehicle.subscribe(data => {
      this.vehicle = data;
      console.log(this.vehicle, 'vehicle');
    });

    this.task7.onReadEmployee();
    this.task7.userName.subscribe(data => {
      this.userName = data;
      console.log(this.userName);
    });

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.origin = { lat: this.lat, lng: this.lng};
          console.log(this.lat, this.lng);
          this.zoom = 12;
        });
      });
    });

    this.mapsAPILoader.load().then(() => {
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
      const autocompleteN = new google.maps.places.Autocomplete(this.searchNElementRef.nativeElement, {
      });
      autocompleteN.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteN.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latN = place.geometry.location.lat();
          this.lngN = place.geometry.location.lng();
          this.destination = {lat: this.latN , lng: this.lngN};
          this.getDirection();
          console.log(this.latN, this.lngN);
          this.zoom = 12;
        });
      });
    });


    this.f = new FormGroup({
      name: new FormControl(),
      mobile: new FormControl(),
      email: new FormControl(),
      payment: new FormControl(),
      pickup: new FormControl(),
      waypoint: new FormControl(),
      drop: new FormControl(),
      maindistance: new FormControl(),
      datetime: new FormControl(),
      service: new FormControl(),
      avtar: new FormControl(),
      price: new FormControl(),
      dtime: new FormControl(),
      assign: new FormControl(),
      cname: new FormControl(),
      ingredients: new FormArray([])

    });

  }


  getData(item) {
    console.log('hello radio');
    console.log(item.carName);
  }

  searchVia(val: any) {
    console.log(val);
    const input = document.getElementById('via' + val) as HTMLInputElement;
    this.viewDir = false;
    const autocomplete = new google.maps.places.Autocomplete(input , {
    });
    autocomplete.addListener('place_changed', () => {
      this.viewDir = false;
    });
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.latNew = place.geometry.location.lat();
        this.lngNew = place.geometry.location.lng();
        const data = { lat: this.latNew , lng: this.lngNew};
        this.waypoints.push({
          location: data,
          stopover: true
        });
        this.getDirection();
        console.log(this.latNew, this.lngNew);
        this.zoom = 12;
      });
    });
  }


  onReadEmployee() {
    this.Task11.onReadEmployee().subscribe(data => {
      this.tripData = data;
      console.log(this.tripData);
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
        console.log('wx kj');
      });
    }
  }

  getDirection() {
    this.origin = {lat: this.lat, lng: this.lng },
    this.destination = {lat: this.latN , lng: this.lngN },
    console.log(this.destination);
    this.maindistance = (google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(this.origin),
      new google.maps.LatLng(this.destination)) / 1000).toFixed(2);
    this.time = +(this.maindistance / this.speed).toFixed(2);
    console.log('ecb', this.maindistance);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log('kjbwh');
          this.f.controls.pickup.setValue(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
       }

    });
  }

  onAddEmployee() {
    const newEmployee = {
      mobile : this.f.value.mobile,
      name : this.f.value.name,
      email : this.f.value.email,
      cname: this.f.value.cname,
      payment : this.f.value.payment,
      pickup : this.f.value.pickup,
      waypoint : this.f.value.waypoint,
      drop : this.f.value.drop,
      maindistance : this.f.value.maindistance,
      datetime : this.f.value.datetime,
      service: this.f.value.service,
      avtar: this.f.value.avtar,
      price: this.f.value.price,
      dtime: this.f.value.dtime,
      assign: 'Assign',
    };
    console.log(newEmployee);
    alert('Successfull your data stored in database!!');
    this.employeeServise.onAddEmployee(newEmployee).subscribe(data => {
      this.tripData.push(data);
      console.log(data);
      console.log(this.tripData);
    });
    this.f = this.fb.group({
      name: null,
      email: null,
      mobile: null,
      payment: null,
      waypoint: null,
      pickup: null,
      drop: null,
      maindistance: null,
      datetime: null,
      avtar: null,
      service: null
    });
  }

  onPay(){
    console.log('pay')
  }

  onAddIngredient() {
    (this.f.get('ingredients') as FormArray).push(
      new FormGroup({
        drop: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.f.get('ingredients') as FormArray).removeAt(index);
    index = this.waypoints.indexOf(location);
    if(index > -1)
    {
      this.waypoints.splice(index, 1 );
    }
  }

  onSelectCountry(event: any){
    const data = event.target.value;
    console.log(data);
    this.userName.filter(country => {
      if (country.name === data) {
        this.f.patchValue({
         name: country.name,
         mobile: country.mobile,
         email: country.email,
         cname: country.cname
        });
      }
    });
  }

  

  onGetVehicle() {
    console.log('hello');
    this.show = true;
  }

}
