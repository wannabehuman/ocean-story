import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  findAll() {
    return this.rankingService.findAll();
  }
  @Get('complete')
  async getRankings() {
  
    return this.rankingService.getRankings();
  }
  @Get(':user_nm')
  findOne(@Param('user_nm') user_nm: string) {
    return this.rankingService.findOne(user_nm);
  }

  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingService.create(createRankingDto);
  }

  @Put(':user_nm')
  update(
    @Param('user_nm') user_nm: string,
    @Body() updateRankingDto: UpdateRankingDto,
  ) {
    return this.rankingService.update(user_nm, updateRankingDto);
  }
  @Patch(':user_nm/start')
  async setStartTime(@Param('user_nm') user_nm: string) {
    return this.rankingService.setStartTime(user_nm);
  }
  
  @Patch(':user_nm/end')
  async setEndTime(@Param('user_nm') user_nm: string) {
    return this.rankingService.setEndTime(user_nm);
  }
  @Patch(':user_nm/complete')
  async setComplete(@Param('user_nm') user_nm: string) {
    return this.rankingService.setComplete(user_nm);
  }
  @Delete(':user_nm')
  remove(@Param('user_nm') user_nm: string) {
    return this.rankingService.remove(user_nm);
  }
} 