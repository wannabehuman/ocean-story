import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishMissionController } from './fish_mission.controller';
import { FishMissionService } from './fish_mission.service';
import { FishMission } from './fish_mission.entity';
import { FishKind } from '../fish_kind/fish_kind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FishMission, FishKind])],
  controllers: [FishMissionController],
  providers: [FishMissionService],
  exports: [FishMissionService],
})
export class FishMissionModule {} 