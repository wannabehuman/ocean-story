import { Module } from '@nestjs/common';
import { SeasonFishController } from './season_fish.controller';
import { SeasonFishService } from './season_fish.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonFish } from './season_fish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonFish])],
  controllers: [SeasonFishController],
  providers: [SeasonFishService],
})

export class SeasonFishModule {}
