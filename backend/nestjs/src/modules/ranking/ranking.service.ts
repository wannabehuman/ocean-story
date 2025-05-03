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
    return this.rankingRepository.find();
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
} 