import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishMap } from './fishMap.entity';
import { FishMapService } from './fishMap.service';
import { FishMapController } from './fishMap.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FishMap])],
  providers: [FishMapService],
  controllers: [FishMapController],
  exports: [FishMapService],
})
export class FishMapModule {} 