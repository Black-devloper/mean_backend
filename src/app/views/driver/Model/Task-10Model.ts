export class DriverAssign {
  lng: any;
  lat: any;
  // tslint:disable-next-line: variable-name
  _id: string;
  cname: string;
  name: string;
  email: string;
  mobile: number;
  service ?: string;
  status: {
    type: string;
  };
  avtar: string;
 loction: {
  point:  {
    type: String,
    require
  },
  coordinate:{
    lat: number,
    lng: number
  }
}
}
