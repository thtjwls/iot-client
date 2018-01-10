import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  on_color: string = 'primary';
  off_color: string = 'default';

  on_status: string = 'ON';
  off_status: string = 'OFF';

  color: string;
  status: string;
  returnType: string;

  transform(value: any, type: string): string {

    if ( type == 'color' ) {
      this.returnType = value ? this.on_color : this.off_color;
    }

    if ( type == 'status' ) {
      this.returnType = value ? this.on_status : this.off_status;
    }

    return this.returnType;
  }

}
