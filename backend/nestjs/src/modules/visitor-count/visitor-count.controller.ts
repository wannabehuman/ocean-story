import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { VisitorCountService } from './visitor-count.service';

@Controller('visitor') // /visitor 라우트
export class VisitorCountController {
  constructor(private readonly visitorCountService: VisitorCountService) {}

  @Get()
  async handleVisit(@Req() req: Request): Promise<string> {
    // 세션에 visited 정보가 없으면(처음 방문이면), 카운트 증가
    if (!req.session.visited) {
      req.session.visited = true;
      await this.visitorCountService.incrementCount();
    }

    const count = await this.visitorCountService.getCount();
    return `현재 방문자 수는: ${count}`;
  }
}
