import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productFilterOptionSortByCheckedFirst'
})
export class ProductFilterOptionSorterPipe implements PipeTransform {
  transform(options: any[], checkedOptions: {[id: string]: boolean}): any[] {
    return [...options].sort((a, b) => {
      if (checkedOptions[a.id] && !checkedOptions[b.id]) {
        return -1;
      } else if (!checkedOptions[a.id] && checkedOptions[b.id]) {
        return 1;
      }
    });
  }
}
