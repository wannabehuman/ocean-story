import { Controller, Post, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}


  
  // 회원가입
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    return {
      message: '회원가입 성공',
      user,
    };
  }



  // 로그인
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request) {
    const user = await this.userService.login(loginUserDto);

    // 세션에 사용자 정보 저장 (세션 방식을 쓸 때)
    req.session.userId = user.id;
    req.session.role = user.role;

    return {
      message: '로그인 성공',
      userId: user.id,
      role: user.role,
    };
  }
}
