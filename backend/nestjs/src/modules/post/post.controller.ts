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
  } from '@nestjs/common';
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
  
    @Post()
    create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
      return this.postService.create(createPostDto);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    ) {
      return this.postService.update(id, updatePostDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.postService.remove(id);
    }
  }
  