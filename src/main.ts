import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import * as helmet from 'helmet';
// import * as csurf from 'csurf';
// import * as rateLimit from 'express-rate-limit';
import morgan from 'morgan'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  // app.use(csurf());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000,
  //     max: 100
  //   })
  // );
  app.use(morgan('dev'));

  // app.use(compression());

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
