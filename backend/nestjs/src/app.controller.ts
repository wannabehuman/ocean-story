import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    return { message: '바다이야기에 오신 것을 환영합니다' };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
