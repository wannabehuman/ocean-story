import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ) {}

    async findAll(): Promise<Location[]> {
        return this.locationRepository.find();
    }

    async findOne(id: string): Promise<Location> {
        return this.locationRepository.findOne({ where: { code: id } });
    }

    async findByCode(code: string): Promise<Location> {
        return this.locationRepository.findOne({ where: { code } });
    }

    async create(createLocationDto: CreateLocationDto): Promise<Location> {
        const location = this.locationRepository.create(createLocationDto);
        return this.locationRepository.save(location);
    }

    async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
        await this.locationRepository.update({ code: id }, updateLocationDto);
        return this.locationRepository.findOne({ where: { code: id } });
    }

    async remove(id: string): Promise<void> {
        await this.locationRepository.delete({ code: id });
    }
}
