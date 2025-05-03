import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YunEntity } from './yun.enitiy';  // .ts 확장자 제거 및 엔티티명 수정
import { CreateYunDto } from './dto/create-yun.dto';  // .ts 확장자 제거
import { UpdateYunDto } from './dto/update-yun.dto';  // .ts 확장자 제거

@Injectable()
export class ServiceYun implements OnModuleInit {
  constructor(
    @InjectRepository(YunEntity)  // 엔티티명 수정
    private yunRepository: Repository<YunEntity>,
  ) {}

  // 모듈 실행 시 초기 데이터 생성
  async onModuleInit() {
    await this.seedInitialData();
  }

  // 초기 데이터 생성 메소드
  private async seedInitialData() {
    const initialYunInfo = [
      {
        yun_name: '윤정서',
        yun_brth: '970713',
        yun_gndr: '여자',
        yun_nknm: '미친토끼',
      },
      {
        yun_name: '미친토끼',
        yun_brth: '970519',
        yun_gndr: '여자',
        yun_nknm: '윤정서랍장',
      },
      {
        yun_name: '윤정서랍장',
        yun_brth: '191012',
        yun_gndr: '여자',
        yun_nknm: '윤모티콘',
      },
    ];

    // 데이터가 없을 때만 초기 데이터 삽입
    const count = await this.yunRepository.count();
    if (count === 0) {
      for (const yunData of initialYunInfo) {
        const yun = this.yunRepository.create(yunData);
        await this.yunRepository.save(yun);
      }
      console.log('초기 데이터가 생성 되어따..!🥲');
    }
  }

  // 모든 데이터 조회
  async findAll(): Promise<YunEntity[]> {
    return this.yunRepository.find();
  }

  // 특정 데이터 조회
  async findOne(yun_id: number): Promise<YunEntity | null> {
    return this.yunRepository.findOne({ where: { yun_id } });
  }

  // 데이터 생성
  async create(createYunDto: CreateYunDto): Promise<YunEntity> {
    const newYun = this.yunRepository.create(createYunDto);
    return this.yunRepository.save(newYun);
  }

  // 데이터 수정
  async update(yun_id: number, updateYunDto: UpdateYunDto): Promise<YunEntity | null> {
    await this.yunRepository.update(yun_id, updateYunDto);
    return this.yunRepository.findOne({ where: { yun_id } });
  }

  // 데이터 삭제
  async remove(yun_id: number): Promise<void> {
    await this.yunRepository.delete(yun_id);
  }
}
