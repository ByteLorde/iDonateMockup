import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionItem'
})
export class ActionItemPipe implements PipeTransform {

  transform(value: any[], hideCompleted: boolean): any {

    if ( !value || hideCompleted === null ) return value;
    return value.filter( (elem) => hideCompleted ? !elem.completed : true)
  }

}
