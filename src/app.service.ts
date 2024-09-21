import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return 'Hello World!';
  }
}
