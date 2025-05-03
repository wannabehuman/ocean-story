import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    try {
      return { message: '바다이야기에 오신 것을 환영합니다!ㅠㅠ' };
    } catch (error) {
      throw new HttpException(
        '데이터를 가져오는데 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get()
  // getTide():string{
  //   return this.appService.getTide();
  // }


}