import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipePipe implements PipeTransform {
  transform(items: any[], searchText: string, propName: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item[propName].toLowerCase().includes(searchText);
    });
  }
}
