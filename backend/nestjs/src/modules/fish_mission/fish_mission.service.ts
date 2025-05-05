import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FishMission } from './fish_mission.entity';
import { CreateFishMissionDto, UpdateFishMissionDto } from './dto/fish-mission.dto';
import { FishKind } from '../fish_kind/fish_kind.entity';

@Injectable()
export class FishMissionService {
    constructor(
        @InjectRepository(FishMission)
        private fishMissionRepository: Repository<FishMission>,
        @InjectRepository(FishKind)
        private fishKindRepository: Repository<FishKind>,
    ) {}

    async findAll(): Promise<FishMission[]> {
        return this.fishMissionRepository.find();
    }

    async findOne(user_nm: string): Promise<FishMission> {
        return this.fishMissionRepository.findOne({ where: { user_nm } });
    }

    async create(createFishMissionDto: CreateFishMissionDto): Promise<FishMission> {
        // 기존 fish_mission이 있으면 삭제
        await this.fishMissionRepository.delete({ user_nm: createFishMissionDto.user_nm });
        
        // fish_kind 테이블에서 5개 어종 랜덤 선택
        const fishMission = await this.createWithRandomFish(createFishMissionDto.user_nm);
        return fishMission;
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

    // 새로운 메서드: 랜덤 어종으로 fish_mission 생성
    async createWithRandomFish(user_nm: string): Promise<FishMission> {
        try {
            // 모든 어종 가져오기
            const allFish = await this.fishKindRepository.find();
            
            // 어종이 5개 미만이면 기본값 사용
            // if (allFish.length < 5) {
            //     const defaultFishMission = new FishMission();
            //     defaultFishMission.user_nm = user_nm;
            //     defaultFishMission.fish_type1 = 'N';
            //     defaultFishMission.fish_type2 = 'N';
            //     defaultFishMission.fish_type3 = 'N';
            //     defaultFishMission.fish_type4 = 'N';
            //     defaultFishMission.fish_type5 = 'N';
            //     return this.fishMissionRepository.save(defaultFishMission);
            // }
            // console.log(allFish);
            // 어종을 랜덤하게 섞기
            const shuffledFish = [...allFish].sort(() => Math.random() - 0.5);
            
            // 5개 선택
            const selectedFish = shuffledFish.slice(0, 5);
            
            // 새 미션 생성
            const fishMission = new FishMission();
            fishMission.user_nm = user_nm;
            
            // 각 어종 타입에 선택된 어종 ID와 N 상태값 설정
            selectedFish.forEach((fish, index) => {
                const fishTypeKey = `fish_type${index + 1}`;
                fishMission[fishTypeKey] = fish.name; // 초기 상태는 '미발견(N)'
                
                // 로그 출력 (실제 서비스에서는 필요 없음)
                console.log(`${fishTypeKey}: ID=${fish.id}, Name=${fish.name}`);
            });
            
            // 저장 및 반환
            return this.fishMissionRepository.save(fishMission);
        } catch (error) {
            console.error('랜덤 어종 선택 중 오류 발생:', error);
            
            // 오류 발생 시 기본값 사용
            const defaultFishMission = new FishMission();
            defaultFishMission.user_nm = user_nm;
            defaultFishMission.fish_type1 = 'N';
            defaultFishMission.fish_type2 = 'N';
            defaultFishMission.fish_type3 = 'N';
            defaultFishMission.fish_type4 = 'N';
            defaultFishMission.fish_type5 = 'N';
            return this.fishMissionRepository.save(defaultFishMission);
        }
    }
} 