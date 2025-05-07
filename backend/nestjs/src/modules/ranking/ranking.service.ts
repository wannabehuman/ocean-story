import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
  ) {}

  async findAll(): Promise<Ranking[]> {
    return this.rankingRepository.find({ where: { complete_flg: 'Y' } });
  }

  async findOne(user_nm: string): Promise<Ranking | null> {
    return this.rankingRepository.findOne({ where: { user_nm } });
  }

  async create(createRankingDto: CreateRankingDto): Promise<Ranking> {
    const ranking = this.rankingRepository.create(createRankingDto);
    return this.rankingRepository.save(ranking);
  }

  async update(user_nm: string, updateRankingDto: UpdateRankingDto): Promise<Ranking | null> {
    await this.rankingRepository.update(user_nm, updateRankingDto);
    return this.rankingRepository.findOne({ where: { user_nm } });
  }

  async remove(user_nm: string): Promise<void> {
    await this.rankingRepository.delete(user_nm);
  }

  async registerNickname(nickname: string) {
    const ranking = this.rankingRepository.create({ user_nm: nickname });
    return this.rankingRepository.save(ranking);
  }
  async setStartTime(user_nm: string) {
    await this.rankingRepository.update({ user_nm }, { start_dt: new Date() });
    return { success: true };
  }
  
  async setEndTime(user_nm: string) {
    await this.rankingRepository.update({ user_nm }, { end_dt: new Date() });
    return { success: true };
  }

  async setComplete(user_nm: string) {
    await this.rankingRepository.update({ user_nm }, { complete_flg: 'Y' });
    return { success: true };
  }
  async getRankings() {
 
    // const where = complete_flg ? { complete_flg: complete_flg } : {};
    return this.rankingRepository.find({ where: { complete_flg: 'N' } });
  }
} 