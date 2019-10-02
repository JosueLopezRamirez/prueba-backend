import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import { apolloUploadExpress } from 'apollo-upload-server'
import helmet from 'helmet';
import morgan from 'morgan';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  app.use(helmet());
  app.use(
    '/graphql',
    apolloUploadExpress()
  )
  // app.use(csurf({cookie:true}));
  // if (process.env.NODE_ENV === 'development'){
  // app.use(morgan('dev'));
  // }
  app.use(compression());
  await app.listen(process.env.PORT || 3000);

}
bootstrap();