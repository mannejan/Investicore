import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {

  public createSentence(string:string){
    let newString
    newString = string.split(/(?=[A-Z])/);
    newString = newString.join(' ').toLowerCase();
    newString = newString[0].toUpperCase() + newString.substring(1);
    return newString;
  }

  transform(value: any, args?: any): any {
    return this.createSentence(value);
  }

}
