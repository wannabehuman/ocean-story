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
  import { ServiceYun } from './yun.service';  // .ts 확장자 제거
  
  declare module 'express-session' {
    interface SessionData {
      userId: number;
      role: number;
    }
  }
  
  @Controller('yun')
  export class YunController {
    constructor(private readonly serviceYun: ServiceYun) {}
  
    @Get()
    findAll() {
      return this.serviceYun.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.serviceYun.findOne(id);
    }

  }
  