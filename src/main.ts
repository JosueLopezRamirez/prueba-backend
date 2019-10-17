import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
// import morgan from 'morgan';
import { HttpExcepcionFilter } from './shared/http.exception.filter';
import { SkiperAgentService } from './mapping/skiper-agent/skiper-agent.service';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExcepcionFilter())
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  app.use(helmet());
  // if (process.env.NODE_ENV === 'development'){
  // app.use(morgan('dev'));
  // }
  app.use(compression());
  await app.listen(process.env.PORT || 4000);

}
bootstrap();