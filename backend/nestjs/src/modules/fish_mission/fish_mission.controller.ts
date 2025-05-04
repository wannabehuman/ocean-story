import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishMissionService } from './fish_mission.service';
import { FishMission } from './fish_mission.entity';
import { CreateFishMissionDto, UpdateFishMissionDto } from './dto/fish-mission.dto';

@Controller('api/fish-mission')
export class FishMissionController {
    constructor(private readonly fishMissionService: FishMissionService) {}

    @Get()
    findAll(): Promise<FishMission[]> {
        return this.fishMissionService.findAll();
    }

    @Get(':user_nm')
    findOne(@Param('user_nm') user_nm: string): Promise<FishMission> {
        return this.fishMissionService.findOne(user_nm);
    }

    @Post()
    create(@Body() createFishMissionDto: CreateFishMissionDto): Promise<FishMission> {
        return this.fishMissionService.create(createFishMissionDto);
    }

    @Patch(':user_nm')
    update(
        @Param('user_nm') user_nm: string,
        @Body() updateFishMissionDto: UpdateFishMissionDto,
    ): Promise<FishMission> {
        return this.fishMissionService.update(user_nm, updateFishMissionDto);
    }

    @Delete(':user_nm')
    remove(@Param('user_nm') user_nm: string): Promise<void> {
        return this.fishMissionService.remove(user_nm);
    }

    @Patch(':user_nm/fish/:fishType')
    updateFishStatus(
        @Param('user_nm') user_nm: string,
        @Param('fishType') fishType: string,
        @Body('status') status: string,
    ): Promise<FishMission> {
        return this.fishMissionService.updateFishStatus(user_nm, fishType, status);
    }

    @Get(':user_nm/completion')
    getCompletionStatus(@Param('user_nm') user_nm: string): Promise<{ total: number, completed: number }> {
        return this.fishMissionService.getCompletionStatus(user_nm);
    }
} 