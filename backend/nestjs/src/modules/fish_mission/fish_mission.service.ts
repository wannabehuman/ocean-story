import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FishMission } from './fish_mission.entity';
import { CreateFishMissionDto, UpdateFishMissionDto } from './dto/fish-mission.dto';

@Injectable()
export class FishMissionService {
    constructor(
        @InjectRepository(FishMission)
        private fishMissionRepository: Repository<FishMission>,
    ) {}

    async findAll(): Promise<FishMission[]> {
        return this.fishMissionRepository.find();
    }

    async findOne(user_nm: string): Promise<FishMission> {
        return this.fishMissionRepository.findOne({ where: { user_nm } });
    }

    async create(createFishMissionDto: CreateFishMissionDto): Promise<FishMission> {
        const fishMission = this.fishMissionRepository.create(createFishMissionDto);
        return this.fishMissionRepository.save(fishMission);
    }

    async update(user_nm: string, updateFishMissionDto: UpdateFishMissionDto): Promise<FishMission> {
        await this.fishMissionRepository.update(user_nm, updateFishMissionDto);
        return this.fishMissionRepository.findOne({ where: { user_nm } });
    }

    async remove(user_nm: string): Promise<void> {
        await this.fishMissionRepository.delete(user_nm);
    }

    async updateFishStatus(user_nm: string, fishType: string, status: string): Promise<FishMission> {
        // fishType이 유효한지 확인 (fish_type1 ~ fish_type5)
        if (!['fish_type1', 'fish_type2', 'fish_type3', 'fish_type4', 'fish_type5'].includes(fishType)) {
            throw new Error('Invalid fish type');
        }

        // 업데이트할 객체 생성
        const updateDto = {};
        updateDto[fishType] = status;

        await this.fishMissionRepository.update(user_nm, updateDto);
        return this.fishMissionRepository.findOne({ where: { user_nm } });
    }

    async getCompletionStatus(user_nm: string): Promise<{ total: number, completed: number }> {
        const fishMission = await this.fishMissionRepository.findOne({ where: { user_nm } });
        
        if (!fishMission) {
            return { total: 5, completed: 0 };
        }

        const fishTypes = [
            fishMission.fish_type1, 
            fishMission.fish_type2, 
            fishMission.fish_type3, 
            fishMission.fish_type4, 
            fishMission.fish_type5
        ];

        const completed = fishTypes.filter(type => type === 'Y').length;
        
        return {
            total: 5,
            completed
        };
    }
} 