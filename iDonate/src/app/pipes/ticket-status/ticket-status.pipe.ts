import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketStatus'
})
export class TicketStatusPipe implements PipeTransform {

  transform(data: Object): any {
    const values = Object.values(data);
    return values;
  }

}
