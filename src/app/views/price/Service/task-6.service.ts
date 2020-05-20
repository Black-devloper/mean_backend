import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Task6Service
{
  zoneData=new Subject<any>();
  constructor(private httpclient:HttpClient,private from:FormBuilder) { }
  addZone(data)
  {
    const addData={
      data:data
    }
    this.httpclient.post('http://localhost:3000/api/zone/add', addData).subscribe(data => {
    })
  }
  updateZone(id,data)
  {
    const newdata={
      id:id,
      data:data
    }
        this.httpclient.post('http://localhost:3000/api/zone/update',newdata).subscribe(data => {
      })
  }
  getZoneById(id)
  {
    const index={
      id:id
    }
        this.httpclient.post('http://localhost:3000/api/zone/fetchById',index).subscribe(data=>{
        this.zoneData.next(data)
        },err=>{
          console.log('Error: ',err);
        });
  }
  getZones()
  {
        this.httpclient.post('http://localhost:3000/api/zone/fetchAll',{}).subscribe(data=>{
        this.zoneData.next(data)
        // console.log(this.zoneData)
        },err=>{
          console.log('Error: ',err);
        });
  }
  deleteTask(index)
  {
    this.httpclient.delete('http://localhost:3000/api/zone/delete/'+index).subscribe(data=>{
        },err=>{
          console.log('Error: ',err);
        });
    }
}
