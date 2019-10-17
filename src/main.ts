import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { HttpExcepcionFilter } from './shared/http.exception.filter';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  //Add GlobalPipes
  app.useGlobalPipes(new ValidationPipe());

  //Add Global Filter
  //app.useGlobalFilters(new HttpExcepcionFilter())
  
  //Add prefix to api rest cec67c9c025ddc79fdaf00202aec05de489207f1
  app.setGlobalPrefix('/v1/api');
  
  // Add Cors universal
  app.enableCors();
  
  //Add Security
  app.use(helmet());
  
  //Add Compression
  app.use(compression());

  await app.listen(process.env.PORT || 4000);

}
bootstrap();