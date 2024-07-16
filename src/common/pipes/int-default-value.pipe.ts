import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class IntDefaultValuePipe implements PipeTransform {
  constructor(private readonly defaultValue: any) {}

  transform(value: string, metadata: ArgumentMetadata): any {
    const val = parseInt(value, 10);
    let check = isNaN(val) ? this.defaultValue : val;
    return isNaN(val) ? this.defaultValue : val;
  }
}
