import { Module } from '@nestjs/common';
import { WeatherForecastsHController } from './weather_forecasts_H.controller';
import { WeatherForecastsHService } from './weather_forecasts_H.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherForecastsH } from './weather_forecasts_H.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherForecastsH])],
  controllers: [WeatherForecastsHController],
  providers: [WeatherForecastsHService],
})
export class WeatherForecastsHModule {}