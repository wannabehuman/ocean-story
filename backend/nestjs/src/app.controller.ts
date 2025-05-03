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
<<<<<<< HEAD

  @Get('yun')
  getJung() {
    return { yunTest: '이건 됐다. 너 잘 해. 너 칭찬해.'}
  }

  @Get('yjs')
  getYjs(): string {
    return this.appService.getYun();
  }
  

=======
  // @Get()
  // getTide():string{
  //   return this.appService.getTide();
  // }
>>>>>>> yun


}
