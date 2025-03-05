import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherForecastsH } from './weather_forecasts_H.entity';
import { CreateWeatherForecastsHDto } from './dto/create-weather_forecasts_H.dto';
import { UpdateWeatherForecastsHDto } from './dto/update-weather_forecasts_H.dto';

@Injectable()
export class WeatherForecastsHService {
  constructor(
    @InjectRepository(WeatherForecastsH)
    private weatherForecastsHRepository: Repository<WeatherForecastsH>,
  ) {}

  async findAll(): Promise<WeatherForecastsH[]> {
    return this.weatherForecastsHRepository.find();
  }

  async findOne(id: number): Promise<WeatherForecastsH | null> {
    return this.weatherForecastsHRepository.findOne({ where: { id } });
  }

  async create(createWeatherForecastsHDto: CreateWeatherForecastsHDto): Promise<WeatherForecastsH> {
    const post = this.weatherForecastsHRepository.create(createWeatherForecastsHDto);
    return this.weatherForecastsHRepository.save(post);
  }

  async update(id: number, updateWeatherForecastsHDto: UpdateWeatherForecastsHDto): Promise<WeatherForecastsH | null> {
    await this.weatherForecastsHRepository.update(id, updateWeatherForecastsHDto);
    return this.weatherForecastsHRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.weatherForecastsHRepository.delete(id);
  }
}