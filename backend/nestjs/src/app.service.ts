import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeaTide } from './modules/sea_tide/sea_tide.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SeaTide)
    private readonly repository: Repository<SeaTide>
  ){}
  getHello(): string {
    return 'Hello World 뭐여 대체';
  }
<<<<<<< HEAD

  getYun(): string {
    return 'service class 안에 적은 메서드라고 봐야하는 것 같은데'
  }

=======
  async callForDateRange() {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-31');
  
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const yyyymmdd = `${yyyy}${mm}${dd}`;
      // await this.tempFunction('DT_0001', yyyymmdd);
      // await this.tempFunction('DT_0005', yyyymmdd);
      // await this.tempFunction('DT_0056', yyyymmdd);
      // await this.tempFunction('DT_0063', yyyymmdd);


      
      // await this.tempFunction('DT_0020', yyyymmdd);
      // await this.tempFunction('DT_0032', yyyymmdd);
      // await this.tempFunction('DT_0031', yyyymmdd);
      // await this.tempFunction('DT_0029', yyyymmdd);
      // await this.tempFunction('DT_0026', yyyymmdd);
      // await this.tempFunction('DT_0049', yyyymmdd);
      // await this.tempFunction('DT_0042', yyyymmdd);
      // await this.tempFunction('DT_0018', yyyymmdd);
      // await this.tempFunction('DT_0017', yyyymmdd);
      // await this.tempFunction('DT_0065', yyyymmdd);


      // await this.tempFunction('DT_0057', yyyymmdd);
      // await this.tempFunction('DT_0062', yyyymmdd);
      // await this.tempFunction('DT_0023', yyyymmdd);
      // await this.tempFunction('DT_0007', yyyymmdd);
      // await this.tempFunction('DT_0006', yyyymmdd);
      // await this.tempFunction('DT_0025', yyyymmdd);
      // await this.tempFunction('DT_0061', yyyymmdd);


      // await this.tempFunction('DT_0094', yyyymmdd);
      // await this.tempFunction('DT_0010', yyyymmdd);



      // await this.tempFunction('DT_0051', yyyymmdd);
      // await this.tempFunction('DT_0022', yyyymmdd);
      // await this.tempFunction('DT_0012', yyyymmdd);
      // await this.tempFunction('DT_0008', yyyymmdd);
      // await this.tempFunction('DT_0067', yyyymmdd);
      // await this.tempFunction('DT_0037', yyyymmdd);
      // await this.tempFunction('DT_0016', yyyymmdd);
      // await this.tempFunction('DT_0092', yyyymmdd);
      // await this.tempFunction('DT_0003', yyyymmdd);
      // await this.tempFunction('DT_0044', yyyymmdd);
      // await this.tempFunction('DT_0043', yyyymmdd);
      // await this.tempFunction('IE_0062', yyyymmdd);
      // await this.tempFunction('DT_0027', yyyymmdd);
      // await this.tempFunction('DT_0039', yyyymmdd);
      // await this.tempFunction('DT_0013', yyyymmdd);
      // await this.tempFunction('DT_0068', yyyymmdd);
      // await this.tempFunction('IE_0060', yyyymmdd);
      // await this.tempFunction('DT_0052', yyyymmdd);
      // await this.tempFunction('DT_0024', yyyymmdd);
      // await this.tempFunction('DT_0004', yyyymmdd);
      // await this.tempFunction('DT_0028', yyyymmdd);
      // await this.tempFunction('DT_0021', yyyymmdd);
      // await this.tempFunction('DT_0050', yyyymmdd);
      // await this.tempFunction('DT_0014', yyyymmdd);
      // await this.tempFunction('DT_0002', yyyymmdd);
      // await this.tempFunction('DT_0091', yyyymmdd);
      // await this.tempFunction('DT_0902', yyyymmdd);
      // await this.tempFunction('DT_0066', yyyymmdd);
      // await this.tempFunction('DT_0011', yyyymmdd);
      // await this.tempFunction('DT_0035', yyyymmdd);
    }
  }
  async tempFunction(callLocation, callDate) {
    try {
      const response = await fetch(`https://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=qDld8fQmSmzsH4/a08yxQ==&ObsCode=${callLocation}&Date=${callDate}&ResultType=json`);
      const data = await response.json();
      const tideReadings = data.result.data; // API 응답 구조에 따라 조정 필요

      // tempData를 매번 새로 생성
      let tempData: any = {
        tideDate: new Date(`${callDate.slice(0, 4)}-${callDate.slice(4, 6)}-${callDate.slice(6, 8)}`),
        location: callLocation,
      };

      // 필요한 값만 추출
      for (const item of tideReadings) {
        if (!tempData.firstHighTide && item.hl_code === '고조') {
          tempData.first_high_tide = item.tph_level;
          tempData.first_high_tide_time = item.tph_time.split(' ')[1];
        } else if (!tempData.first_low_tide && item.hl_code === '저조') {
          tempData.first_low_tide = item.tph_level;
          tempData.first_low_tide_time = item.tph_time.split(' ')[1];
        }  
        if (!tempData.second_high_tide && item.hl_code === '고조') {
          tempData.second_high_tide = item.tph_level;
          tempData.second_high_tide_time = item.tph_time.split(' ')[1];
        } else if (!tempData.second_low_tide && item.hl_code === '저조') {
          tempData.second_low_tide = item.tph_level;
          tempData.second_low_tide_time = item.tph_time.split(' ')[1];
        }
      }

      // 값이 잘 들어갔는지 확인
      console.log(tempData);

      // DB에 저장
      const entity = this.repository.create(tempData);
      await this.repository.save(entity);

    } catch (error) {
      console.error('Error fetching tide data:', error);
      return Promise.reject(error);
    }
  }
  getTide():string{

    this.callForDateRange();





    return 'tide';
  }
>>>>>>> yun
}
