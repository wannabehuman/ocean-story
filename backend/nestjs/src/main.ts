import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');  // 모든 라우트에 'api' prefix 적용
  // CORS 설정 추가
  // app.enableCors({
  //   origin: 'http://ocean-story.kr', // Vue 개발 서버 주소
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  app.enableCors({
    origin: 'http://localhost:8080', // Vue 개발 서버 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      // secret: process.env.SESSION_SECRET || 'ocean_story_secret_key',
      secret: process.env.SESSION_SECRET,
      resave : false,
      saveUninitialized: false,
      cookie:{
        maxAge: 1000 * 60 * 60,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
