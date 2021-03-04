import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../../models/images';

@Pipe({
  name: 'sliceImg',
})
export class SlicePipe implements PipeTransform {
  transform(images: Image[], firstValue: number, lastValue: number): Image[] {
    return images.slice(firstValue, lastValue);
  }
}
