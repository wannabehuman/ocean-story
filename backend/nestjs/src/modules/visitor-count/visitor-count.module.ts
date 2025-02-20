import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorCount } from './visitor-count.entity';
import { VisitorCountService } from './visitor-count.service';
import { VisitorCountController } from './visitor-count.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorCount])],
  controllers: [VisitorCountController],
  providers: [VisitorCountService],
})
export class VisitorCountModule {}