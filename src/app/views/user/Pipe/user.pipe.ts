import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {



  transform(value: any, sertxt: string): any {
    const data = [];
    if (sertxt === undefined) {
      return value;
    }
    const regex = new RegExp(sertxt, 'i');
    value.filter(index => {
      if (
        index['cname'].match(regex) || index['name'].match(regex) || index['email'].match(regex)
      ) {

        data.push(index);

      }
    //  if( index['name'].match(regex) ) {
    //     data.push(index);
    //   }
    });
    return data;
  }


}
