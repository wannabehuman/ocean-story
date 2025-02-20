import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 회원가입
  async register(createUserDto: CreateUserDto): Promise<User> {
    // username 중복 체크
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new Error('이미 존재하는 사용자명입니다.');
    }

    // 비밀번호 해시 등 실제 서비스에서는 추가 로직 필요한데 일단 보류류
    const newUser = this.userRepository.create(createUserDto);
    // role은 DB 2로 들어감
    return this.userRepository.save(newUser);
  }

  // 로그인
  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 해시 일단 뻈습니다 jwt토큰이나
    if (user.password !== loginUserDto.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  // 유저 조회
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
