import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AppController } from './app.controller';

//Modulos
import { KindTicketModule } from './mapping/kind-ticket/kind-ticket.module';
import { TicketCategoryModule } from './mapping/ticket-category/ticket-category.module';
import { TicketPriorityModule } from './mapping/ticket-priority/ticket-priority.module';
import { TicketStatusModule } from './mapping/ticket-status/ticket-status.module';
import { SupportTicketModule } from './mapping/support-ticket/support-ticket.module';
import { SkiperOrderModule } from './mapping/skiper-order/skiper-order.module';
import { SkiperOrderDetailModule } from './mapping/skiper-order-detail/skiper-order-detail.module';

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
import { SkiperDriverScheduleModule } from './mapping/skiper-driver-schedule/skiper-driver-schedule.module';
import { SkiperOrderTracingModule } from './mapping/skiper-order-tracing/skiper-order-tracing.module';
import { UserCivilStatusModule } from './mapping/user-civil-status/user-civil-status.module';
import { AppCitiesModule } from './mapping/app-cities/app-cities.module';

@Module({
  imports: [
    AppCitiesModule,
    KindTicketModule,
    TicketCategoryModule,
    TicketPriorityModule,
    TicketStatusModule,
    SupportTicketModule,
    SkiperOrderModule,
    SkiperOrderDetailModule,

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
    SkiperDriverScheduleModule,
    SkiperOrderTracingModule,
    UserCivilStatusModule,
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
      installSubscriptionHandlers: true,
      context: async ({ req, connection }) => ({
        headers: connection ? null : req.headers
      }),
      subscriptions: {
        onConnect: (connectionParams, webSocket) => {
            console.log('Websocket CONNECTED');
            return { hello: 'world' }
        },
        onDisconnect: () => console.log('Websocket DISCONNECTED'),
      },
      formatError: (err) => {
        return ({
          message: err.extensions.exception.message,
          status: err.extensions.exception.status,
        })
      },
      cors:{
        "origin": "*",
        "Access-Control-Allow-Origin":"*"
      }
    })
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule { }