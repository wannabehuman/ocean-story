import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FishMapService } from './fishMap.service';
import { FishMap } from './fishMap.entity';
import { FishMapDto } from './dto/fishMap.dto';

@Controller('fishmap')
export class FishMapController {
  constructor(private readonly fishMapService: FishMapService) {}

  @Get()
  async findAll(): Promise<FishMap[]> {
    return await this.fishMapService.findAll();
  }

  @Get('region/:region')
  async findByRegion(@Param('region') region: string): Promise<FishMap[]> {
    return await this.fishMapService.findByRegion(region);
  }

  @Get('fish/:fishName')
  async findByFishName(@Param('fishName') fishName: string): Promise<FishMap[]> {
    return await this.fishMapService.findByFishName(fishName);
  }

  @Get('protected')
  async findProtectedFish(@Query('date') date: string): Promise<FishMap[]> {
    return await this.fishMapService.findProtectedFish(date);
  }

  @Get('date')
  async findSeasonFish(@Query('date') date: string): Promise<FishMap[]> {
    return await this.fishMapService.findSeasonFish(date);
  }

  @Post()
  async create(@Body() fishMapDto: FishMapDto): Promise<FishMap> {
    return await this.fishMapService.create(fishMapDto);
  }

  @Post('bulk')
  async createMany(@Body() fishMapDtos: FishMapDto[]): Promise<FishMap[]> {
    return await this.fishMapService.createMany(fishMapDtos);
  }
} 