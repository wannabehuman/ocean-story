import {
    Controller,
    Get,
    Post as PostMethod,
    Put,
    Delete,
    Body,
    Param,
    ValidationPipe,
    ParseIntPipe,
    Req,
    ForbiddenException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { SeasonFishService } from './season_fish.service';
  
  declare module 'express-session' {
    interface SessionData {
      userId: number;
      role: number;
    }
  }
  
  @Controller('season_fish')
  export class SeasonFishController {
    constructor(private readonly SeasonFishService: SeasonFishService) {}
  
    @Get()
    findAll() {
      return this.SeasonFishService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.SeasonFishService.findOne(id);
    }

  }
  