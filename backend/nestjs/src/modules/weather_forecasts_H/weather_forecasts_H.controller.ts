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
  import { WeatherForecastsHService } from './weather_forecasts_H.service';
  
  declare module 'express-session' {
    interface SessionData {
      userId: number;
      role: number;
    }
  }
  
  @Controller('posts')
  export class WeatherForecastsHController {
    constructor(private readonly weatherForecastsHService: WeatherForecastsHService) {}
  
    @Get()
    findAll() {
      return this.weatherForecastsHService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.weatherForecastsHService.findOne(id);
    }

  }
  