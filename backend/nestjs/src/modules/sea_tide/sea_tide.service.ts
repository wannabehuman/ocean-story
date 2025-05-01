import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SeaTide } from './sea_tide.entity';
import { CreateSeaTideDto } from './dto/create-sea_tide.dto';
import { UpdateSeaTideDto } from './dto/update-sea_tide.dto';

@Injectable()
export class SeaTideService {
  constructor(
    @InjectRepository(SeaTide)
    private seaTideRepository: Repository<SeaTide>,
  ) {}


  async findAll(): Promise<SeaTide[]> {
    return this.seaTideRepository.find();
  }

  async findOne(tideDate: Date): Promise<SeaTide | null> {
    return this.seaTideRepository.findOne({ where: { tideDate } });
  }

  async create(createSeaTideDto: CreateSeaTideDto): Promise<SeaTide> {
    const post = this.seaTideRepository.create(createSeaTideDto);
    return this.seaTideRepository.save(post);
  }

  async update(tideDate: Date, updateSeaTideDto: UpdateSeaTideDto): Promise<SeaTide | null> {
    await this.seaTideRepository.update(tideDate, updateSeaTideDto);
    return this.seaTideRepository.findOne({ where: { tideDate } });
  }

  async remove(tideDate: Date): Promise<void> {
    await this.seaTideRepository.delete(tideDate);
  }
  async findByYearMonthAndLocation(
    year: number, 
    month: number, 
    location: string
  ): Promise<SeaTide[]> {
    return this.seaTideRepository.find({
      where: {
        tideDate: Between(
          new Date(year, month - 1, 1),
          new Date(year, month, 0)
        ),
        location: location
      },
      order: {
        tideDate: 'ASC'
      }
    });
  }
  
}