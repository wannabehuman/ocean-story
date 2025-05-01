import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ValidationPipe,
    ParseIntPipe,
    Req,
    ForbiddenException,
    Query,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { SeaTideService } from './sea_tide.service';
  import { CreateSeaTideDto } from './dto/create-sea_tide.dto';
  import { UpdateSeaTideDto } from './dto/update-sea_tide.dto';
  
  declare module 'express-session' {
    interface SessionData {
      userId: number;
      role: number;
    }
  }
  
  @Controller('sea-tides')
  export class SeaTideController {
    constructor(private readonly seaTideService: SeaTideService) {}
  
    @Get()
    findAll() {
      return this.seaTideService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: Date) {
      return this.seaTideService.findOne(id);
    }
    @Post()
    create(@Body() createSeaTideDto: CreateSeaTideDto) {
      return this.seaTideService.create(createSeaTideDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: Date, @Body() updateSeaTideDto: UpdateSeaTideDto) {
      return this.seaTideService.update(id, updateSeaTideDto);
    }
  
    @Get(':year/:month/:location')
    async getMonthlyTides(
      @Param('year') year: number,
      @Param('month') month: number,
      @Param('location') location: string
    ) {
  
        return this.seaTideService.findByYearMonthAndLocation(year, month, location);

    }
  }
  