import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get()
    findAll(): Promise<Location[]> {
        return this.locationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Location> {
        return this.locationService.findOne(id);
    }

    @Get('code/:code')
    findByCode(@Param('code') code: string): Promise<Location> {
        return this.locationService.findByCode(code);
    }

    @Post()
    create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
        return this.locationService.create(createLocationDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLocationDto: UpdateLocationDto,
    ): Promise<Location> {
        return this.locationService.update(id, updateLocationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.locationService.remove(id);
    }
}
