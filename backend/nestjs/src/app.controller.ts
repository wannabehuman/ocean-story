import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    return { message: '바다이야기에 오신 것을 환영합니다!ㅠㅠ' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('yun')
  getJung() {
    return { yunTest: '이건 됐다. 너 잘 해. 너 칭찬해.'}
  }

  @Get('yjs')
  getYjs(): string {
    return this.appService.getYun();
  }
  



}
