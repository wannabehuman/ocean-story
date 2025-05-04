import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishKindService } from './fish_kind.service';
import { FishKind } from './fish_kind.entity';
import { CreateFishKindDto, UpdateFishKindDto } from './dto/fish-kind.dto';

@Controller('api/fish-kind')
export class FishKindController {
    constructor(private readonly fishKindService: FishKindService) {}

    @Get()
    findAll(): Promise<FishKind[]> {
        return this.fishKindService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<FishKind> {
        return this.fishKindService.findOne(+id);
    }

    @Post()
    create(@Body() createFishKindDto: CreateFishKindDto): Promise<FishKind> {
        return this.fishKindService.create(createFishKindDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateFishKindDto: UpdateFishKindDto,
    ): Promise<FishKind> {
        return this.fishKindService.update(+id, updateFishKindDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.fishKindService.remove(+id);
    }
} 