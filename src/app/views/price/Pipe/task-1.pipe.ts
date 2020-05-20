import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Task1Pipe implements PipeTransform {


  transform(value: any, sertxt: string): any {
    const data = [];
    if (sertxt === undefined) {
      return value;
    }
    const regex = new RegExp(sertxt, 'i');
    value.filter(index => {
      if (
        index['name'].match(regex)
      ) {

        data.push(index);

      }
    });
    return data;
  }

  }
