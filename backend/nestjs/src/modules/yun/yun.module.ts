import { Module } from '@nestjs/common';
import { YunController } from './yun.controller';  // 수정된 부분
import { ServiceYun  } from './yun.service';  // 수정된 부분
import { TypeOrmModule } from '@nestjs/typeorm';
import { YunEntity  } from './yun.enitiy';

@Module({
  imports: [TypeOrmModule.forFeature([YunEntity])],
  controllers: [YunController],  // 수정된 부분
  providers: [ServiceYun ],  // 수정된 부분
  exports: [ServiceYun ],  // 수정된 부분
})
export class YunModule {}  // 수정된 부분
