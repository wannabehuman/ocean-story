import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorCount } from './visitor-count.entity';

@Injectable()
export class VisitorCountService {
  constructor(
    @InjectRepository(VisitorCount)
    private readonly visitorCountRepo: Repository<VisitorCount>,
  ) {}

  // 테이블에 아무 데이터가 없으면 1개 만들어둔다.
  async initCounter() {
    const existing = await this.visitorCountRepo.find();
    if (existing.length === 0) {
      const newRecord = this.visitorCountRepo.create({ totalCount: 0 });
      await this.visitorCountRepo.save(newRecord);
    }
  }

  // 1 증가
  async incrementCount() {
    // 단 한 줄만 있다고 가정 (find() 후 첫 번째 레코드만 쓰는 방식)
    const [record] = await this.visitorCountRepo.find();
    record.totalCount++;
    await this.visitorCountRepo.save(record);
  }

  async getCount(): Promise<number> {
    const [record] = await this.visitorCountRepo.find();
    return record.totalCount;
  }
}
