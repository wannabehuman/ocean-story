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
  import { CrewsService } from './crews.service';
  
  declare module 'express-session' {
    interface SessionData {
      userId: number;
      role: number;
    }
  }
  
  @Controller('crews')
  export class CrewsController {
    constructor(private readonly crewsService: CrewsService) {}
  
    @Get()
    findAll() {
      return this.crewsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.crewsService.findOne(id);
    }

  }
  