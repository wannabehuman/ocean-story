import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FishMap } from './fishMap.entity';
import { FishMapDto } from './dto/fishMap.dto';

@Injectable()
export class FishMapService {
  constructor(
    @InjectRepository(FishMap)
    private fishMapRepository: Repository<FishMap>,
  ) {}

  async findAll(): Promise<FishMap[]> {
    return await this.fishMapRepository.find();
  }

  async findByRegion(region: string): Promise<FishMap[]> {
    return await this.fishMapRepository.find({
      where: { Region: region },
    });
  }

  async findByFishName(fishName: string): Promise<FishMap[]> {
    return await this.fishMapRepository.find({
      where: { FishName: fishName },
    });
  }

  async create(fishMapDto: FishMapDto): Promise<FishMap> {
    const fishMap = this.fishMapRepository.create(fishMapDto);
    return await this.fishMapRepository.save(fishMap);
  }

  async createMany(fishMapDtos: FishMapDto[]): Promise<FishMap[]> {
    const fishMaps = this.fishMapRepository.create(fishMapDtos);
    return await this.fishMapRepository.save(fishMaps);
  }

  // 날짜 문자열을 월과 일로 분리하는 헬퍼 함수
  private parseDate(dateStr: string): { month: number; day: number } {
    const [year, month, day] = dateStr.split('-').map(Number);
    return { month, day };
  }

  // 보호어종 조회
  async findProtectedFish(date: string): Promise<FishMap[]> {
    const { month, day } = this.parseDate(date);
    const currentDate = `${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일`;
    
    const allFish = await this.fishMapRepository.find();
    return allFish.filter(fish => {
      if (!fish.ProtectStartDate || !fish.ProtectEndDate) return false;
      
      const startDate = fish.ProtectStartDate;
      const endDate = fish.ProtectEndDate;
      
      // 시작월일과 종료월일 파싱
      const [startMonth, startDay] = startDate.split(' ')[0].split('월').map(n => parseInt(n));
      const [endMonth, endDay] = endDate.split(' ')[0].split('월').map(n => parseInt(n));
      
      // 현재 날짜가 보호기간 내에 있는지 확인
      if (month > startMonth && month < endMonth) return true;
      if (month === startMonth && day >= startDay) return true;
      if (month === endMonth && day <= endDay) return true;
      
      return false;
    });
  }

  // 시즌어종 조회
  async findSeasonFish(date: string): Promise<FishMap[]> {
    const { month, day } = this.parseDate(date);
    const currentDate = `${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일`;
    
    const allFish = await this.fishMapRepository.find();
    return allFish.filter(fish => {
      if (!fish.StartDate || !fish.EndDate) return false;
      
      const startDate = fish.StartDate;
      const endDate = fish.EndDate;
      
      // 시작월일과 종료월일 파싱
      const [startMonth, startDay] = startDate.split(' ')[0].split('월').map(n => parseInt(n));
      const [endMonth, endDay] = endDate.split(' ')[0].split('월').map(n => parseInt(n));
      
      // 현재 날짜가 시즌 기간 내에 있는지 확인
      if (month > startMonth && month < endMonth) return true;
      if (month === startMonth && day >= startDay) return true;
      if (month === endMonth && day <= endDay) return true;
      
      return false;
    });
  }
} 