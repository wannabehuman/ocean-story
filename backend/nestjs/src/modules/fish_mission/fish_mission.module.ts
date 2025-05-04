import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishMissionController } from './fish_mission.controller';
import { FishMissionService } from './fish_mission.service';
import { FishMission } from './fish_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FishMission])],
  controllers: [FishMissionController],
  providers: [FishMissionService],
  exports: [FishMissionService],
})
export class FishMissionModule {} 