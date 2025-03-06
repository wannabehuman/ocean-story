import { Module } from '@nestjs/common';
import { CrewsController } from './crews.controller';
import { CrewsService } from './crews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crews } from './crews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crews])],
  controllers: [CrewsController],
  providers: [CrewsService],
  exports: [CrewsService],
})
export class CrewsModule {}