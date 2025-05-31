import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonFish } from './season_fish.entity';
import { CreateSeasonFishDto } from './dto/create-season_fish.dto';
import { UpdateSeasonFishDto } from './dto/update-season_fish.dto';

import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class SeasonFishService {
  constructor(
    @InjectRepository(SeasonFish)
    private SeasonFishRepository: Repository<SeasonFish>,
  ) {}

  // 모듈 실행 시 초기 데이터 생성
  async onModuleInit() {
    await this.seedInitialData();
  }

  // 초기 데이터 생성 메소드
  private async seedInitialData() {
    // 1. 이미지 폴더 실제 경로 설정 (예: /public/assets/Fish 또는 절대 경로 사용)

    const imagesDir = path.join(process.cwd(), 'public', 'fish'); // ✅ 여기가 핵심!

    // const imagesDir = path.join(__dirname, '../../../public/Fish');

    // 2. 이미지 파일 목록 불러오기
    let imageFiles: string[] = [];
    try {
      imageFiles = fs.readdirSync(imagesDir).filter(file =>
        /\.(png|jpe?g|webp)$/i.test(file)
      );
    } catch (err) {
      console.error('이미지 폴더를 읽는 중 오류 발생:', err);
      return;
    }

    // 3. 초기 어종 배열 구성
    const initialFish = imageFiles.map((fileName, index) => {
      const name = fileName.replace(/\.[^/.]+$/, ''); // 확장자 제거
      return {
        name,
        description: `물고기${index + 1}`,
        imagedir: `/assets/Fish/${fileName}` // 프론트에서 접근 가능한 상대 경로로 저장
      };
    });

    console.log(initialFish);


    // 데이터가 없을 때만 초기 데이터 삽입
    const count = await this.SeasonFishRepository.count();
    if (count === 0) {
      for (const FishData of initialFish) {
        const Fish = this.SeasonFishRepository.create(FishData);
        await this.SeasonFishRepository.save(Fish);
      }
      console.log('어종가 성공적으로 생성되었습니다.');
    }
  }

  async findAll(): Promise<SeasonFish[]> {
    return this.SeasonFishRepository.find();
  }

  async findOne(id: number): Promise<SeasonFish | null> {
    return this.SeasonFishRepository.findOne({ where: { id } });
  }

  async create(createSeasonFishDto: CreateSeasonFishDto): Promise<SeasonFish> {
    const post = this.SeasonFishRepository.create(createSeasonFishDto);
    return this.SeasonFishRepository.save(post);
  }

  async update(id: number, updateSeasonFishDto: UpdateSeasonFishDto): Promise<SeasonFish | null> {
    await this.SeasonFishRepository.update(id, updateSeasonFishDto);
    return this.SeasonFishRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.SeasonFishRepository.delete(id);
  }
}