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
  import { PostService } from './post.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  
  @Controller('posts')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @Get()
    findAll() {
      return this.postService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.postService.findOne(id);
    }
  
    @PostMethod()
    create(@Body(ValidationPipe) createPostDto: CreatePostDto, @Req() req:Request) {
      if (req.session.role !== 0){
        throw new ForbiddenException('슈퍼관리자만 글쓰기가 가능합니다!');
      }
      return this.postService.create(createPostDto);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe) updatePostDto: UpdatePostDto,
      @Req() req: Request,
    ) {
      if(req.session.role !== 0){
        throw new ForbiddenException('슈퍼관리자만 수정이 가능합니다!');
      }
      return this.postService.update(id, updatePostDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Req() req:Request) {
      if(req.session.role !==0){
        throw new ForbiddenException('슈퍼관리자만 삭제가 가능합니다!');
      }
      return this.postService.remove(id);
    }
  }
  