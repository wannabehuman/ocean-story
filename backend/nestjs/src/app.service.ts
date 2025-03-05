import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(

  ){}
  getHello(): string {
    return 'Hello World 뭐여 대체';
  }
}
