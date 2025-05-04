import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FishKind } from './fish_kind.entity';
import { CreateFishKindDto, UpdateFishKindDto } from './dto/fish-kind.dto';

@Injectable()
export class FishKindService {
    constructor(
        @InjectRepository(FishKind)
        private fishKindRepository: Repository<FishKind>,
    ) {}

    async findAll(): Promise<FishKind[]> {
        return this.fishKindRepository.find();
    }

    async findOne(id: number): Promise<FishKind> {
        return this.fishKindRepository.findOne({ where: { id } });
    }

    async create(createFishKindDto: CreateFishKindDto): Promise<FishKind> {
        const fishKind = this.fishKindRepository.create(createFishKindDto);
        return this.fishKindRepository.save(fishKind);
    }

    async update(id: number, updateFishKindDto: UpdateFishKindDto): Promise<FishKind> {
        await this.fishKindRepository.update(id, updateFishKindDto);
        return this.fishKindRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.fishKindRepository.delete(id);
    }
} 