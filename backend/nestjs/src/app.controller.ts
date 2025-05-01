import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  async getData() {
    // for(let i = 0; i < 10; i++){
      // return this.appService.getTide();
    // }
    // return {message: this.tempFunction('DT_0001','20250426')};
    return {message: this.appService.getHello()};
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
