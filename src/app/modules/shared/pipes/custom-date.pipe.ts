import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        if (value.toString().length <= 11) {
            value *= 1000;
        }
        const date = new Date(value);
        return date.toLocaleDateString('cs-CZ');
    }
}
