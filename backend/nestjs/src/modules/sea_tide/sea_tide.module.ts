import { Module } from '@nestjs/common';
import { SeaTideController } from './sea_tide.controller';
import { SeaTideService } from './sea_tide.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeaTide } from './sea_tide.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeaTide]),
  ],
  controllers: [SeaTideController],
  providers: [SeaTideService],
  exports: [SeaTideService],
})
export class SeaTideModule {}