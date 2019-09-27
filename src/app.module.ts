import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './mapping/users/users.module';
import { SkiperAgentCommerceModule } from './mapping/skiper-agent-commerce/skiper-agent-commerce.module';
import { SkiperDetailVehicleModule } from './mapping/skiper-detail-vehicle/skiper-detail-vehicle.module';
import { SkiperAgentDriverModule } from './mapping/skiper-agent-driver/skiper-agent-driver.module';
import { AuthModule } from './auth/auth.module';
// import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { UploadSkiperDocModule } from './mapping/upload-skiper-doc/upload-skiper-doc.module';
import { UploadCommerceDocModule } from './mapping/upload-commerce-doc/upload-commerce-doc.module';
import { SkiperDetailCommerceModule } from './mapping/skiper-detail-commerce/skiper-detail-commerce.module';
import { SkiperCatServicesModule } from './mapping/skiper-cat-services/skiper-cat-services.module';
import { CountriesModule } from './mapping/countries/countries.module';
import { MulterModule } from '@nestjs/platform-express';
import { CitiesModule } from './mapping/cities/cities.module';
import { join } from 'path';

@Module({
  imports: [
    // ChatModule,
    SharedModule,
    UsersModule,
    AuthModule,
    SkiperAgentCommerceModule,
    SkiperAgentDriverModule,
    UploadSkiperDocModule,
    UploadCommerceDocModule,
    SkiperDetailCommerceModule,
    SkiperDetailVehicleModule,
    SkiperCatServicesModule,
    CountriesModule,
    CitiesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number.parseFloat(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      // dropSchema: true
    }),
    MulterModule.register({
      dest:'./uploads'
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
      // debug: true,
      introspection: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}