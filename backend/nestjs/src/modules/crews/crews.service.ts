import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crews } from './crews.entity';
import { CreateCrewsDto } from './dto/create-crews.dto';
import { UpdateCrewsDto } from './dto/update-crews.dto';

@Injectable()
export class CrewsService implements OnModuleInit {
  constructor(
    @InjectRepository(Crews)
    private crewsRepository: Repository<Crews>,
  ) {}

  // 모듈 실행 시 초기 데이터 생성
  async onModuleInit() {
    await this.seedInitialData();
  }

  // 초기 데이터 생성 메소드
  private async seedInitialData() {
    const initialCrews = [
      {
        crew_nm: '이원기',
        crew_role: '선장',
        crew_rank: '0',
        crew_type: '이상한사람',
        crew_status: '재직중'
      },
      {
        crew_nm: '윤정서',
        crew_role: '부선장',
        crew_rank: '1',
        crew_type: '이상한사람',
        crew_status: '재직중'
      },
      {
        crew_nm: '오수민',
        crew_role: '항해사',
        crew_rank: '1',
        crew_type: '착한사람',
        crew_status: '재직중'
      },
      {
        crew_nm: '태수호',
        crew_role: '척척석사',
        crew_rank: '2',
        crew_type: '똑똑한사람',
        crew_status: '재직중'
      },
      {
        crew_nm: '김진호',
        crew_role: '취준생',
        crew_rank: '2',
        crew_type: '착한사람',
        crew_status: '재직중'
      },
      {
        crew_nm: '이상화',
        crew_role: '노예',
        crew_rank: '3',
        crew_type: '불쌍한사람',
        crew_status: '재직중'
      }
    ];

    // 데이터가 없을 때만 초기 데이터 삽입
    const count = await this.crewsRepository.count();
    if (count !== initialCrews.length) {
      this.crewsRepository.clear();
      for (const crewData of initialCrews) {
        const crew = this.crewsRepository.create(crewData);
        await this.crewsRepository.save(crew);
      }
      console.log('초기 크루 데이터가 성공적으로 생성되었습니다.');
    }
  }

  async findAll(): Promise<Crews[]> {
    return this.crewsRepository.find();
  }

  async findOne(crew_id: number): Promise<Crews | null> {
    return this.crewsRepository.findOne({ where: { crew_id } });
  }

  async create(createCrewsDto: CreateCrewsDto): Promise<Crews> {
    const post = this.crewsRepository.create(createCrewsDto);
    return this.crewsRepository.save(post);
  }

  async update(crew_id: number, updateCrewsDto: UpdateCrewsDto): Promise<Crews | null> {
    await this.crewsRepository.update(crew_id, updateCrewsDto);
    return this.crewsRepository.findOne({ where: { crew_id } });
  }

  async remove(crew_id: number): Promise<void> {
    await this.crewsRepository.delete(crew_id);
  }
}