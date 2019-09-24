import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  // app.use(helmet())
  // app.use(csurf({cookie:true}));
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000,
  //     max: 100
  //   })
  // );
  // if (process.env.NODE_ENV === 'developement'){
  //   app.use(morgan('dev'));
  // }
  app.use(compression());
  await app.listen(process.env.PORT || 3000);

}
bootstrap();