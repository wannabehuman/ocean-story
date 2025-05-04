import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishKindController } from './fish_kind.controller';
import { FishKindService } from './fish_kind.service';
import { FishKind } from './fish_kind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FishKind])],
  controllers: [FishKindController],
  providers: [FishKindService],
  exports: [FishKindService],
})
export class FishKindModule {} 