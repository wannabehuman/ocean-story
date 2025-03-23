import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // CORS 허용


  app.use(
    session({
      secret: "DSDS",
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
