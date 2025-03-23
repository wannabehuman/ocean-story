import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(

  ){}
  getHello(): string {
    return 'Hello World 뭐여 대체';
  }

  getYun(): string {
    return 'service class 안에 적은 메서드라고 봐야하는 것 같은데'
  }

}
