import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

//Modulos
import { CategoryAgentModule } from './mapping/category-agent/category-agent.module';
import { SkiperAgentModule } from './mapping/skiper-agent/skiper-agent.module';
import { SkiperCommerceModule } from './mapping/skiper-commerce/skiper-commerce.module';
import { UsersModule } from './mapping/users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CountriesModule } from './mapping/countries/countries.module';
import { MulterModule } from '@nestjs/platform-express';
import { CitiesModule } from './mapping/cities/cities.module';
import { SkiperCatCommerceModule } from './mapping/skiper-cat-commerce/skiper-cat-commerce.module';
import { SkiperCatProductCommerceModule } from './mapping/skiper-cat-product-commerce/skiper-cat-product-commerce.module';
import { SkiperProductCommerceModule } from './mapping/skiper-product-commerce/skiper-product-commerce.module';
import { SizeProductModule } from './mapping/size-product/size-product.module';
import { OptionAddonModule } from './mapping/option-addon/option-addon.module';
import { CommerceRolModule } from './mapping/commerce-rol/commerce-rol.module';
import { UserCommerceRolesModule } from './mapping/user-commerce-roles/user-commerce-roles.module';
import { CommerceModulesModule } from './mapping/commerce-modules/commerce-modules.module';
import { CommerceOperationsModule } from './mapping/commerce-operations/commerce-operations.module';
import { RolOperationModule } from './mapping/rol-operation/rol-operation.module';
import { AppsModule } from './mapping/apps/apps.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    AuthModule,
    CountriesModule,
    CitiesModule,
    CategoryAgentModule,
    SkiperAgentModule,
    SkiperCommerceModule,
    SkiperCatCommerceModule,
    SkiperCatProductCommerceModule,
    SkiperProductCommerceModule,
    SizeProductModule,
    OptionAddonModule,
    CommerceRolModule,
    UserCommerceRolesModule,
    CommerceModulesModule,
    CommerceOperationsModule,
    RolOperationModule,
    AppsModule,
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
      dest: './uploads'
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: './schema.gql',
      typePaths: ['./**/*.graphql'],
      playground: true,
      introspection: true,
      // debug:true,
      installSubscriptionHandlers: true
    })
  ],
  providers: [AppService, AppResolver],
})
export class AppModule { }