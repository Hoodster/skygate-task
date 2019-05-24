import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownFilter'
})
export class DropdownFilterPipe implements PipeTransform {

  transform(value: any, inputValue: string): any {
    if (inputValue === null) return;

    const filtered = value.filter((val: string) => {
      return  val.toLowerCase().startsWith(inputValue.toLowerCase());
    })

    return filtered;
  }
}
