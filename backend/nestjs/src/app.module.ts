import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';

// import { TypeOrmModule } from '@nestjs/typeorm'; //type orm 추가
// import { VisitorCountModule } from './modules/visitor-count/visitor-count.module'; // visitor모듈 생성한거 추가가

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // 환경 변수를 전체 모듈에서 사용하도록 설정
    }),

    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.DB_HOST,  
      port: +process.env.DB_PORT,        
      username: process.env.DB_USERNAME,  
      password: process.env.DB_PASSWORD,  
      database: process.env.DB_NAME,      
      autoLoadEntities:true,
      synchronize: true,  // 테이블을 자동으로 동기화
      logging: true,      // SQL 로그 콘솔 출력. 분명... 연결은 됐는데?
    }),
    PostModule,
    // VisitorCountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  

  
})
export class AppModule{}
