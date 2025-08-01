import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, completeWords = false, ellipsis = '...'): string {
    if (!value) return 'No description available';

    if (value.length <= limit) return value;

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }
}
