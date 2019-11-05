import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsResolver } from './payment-methods.resolver';
import { PaymentMethods } from './payment-methods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethods])
  ],
  providers: [PaymentMethodsService, PaymentMethodsResolver],
  exports: [PaymentMethodsService]
})
export class PaymentMethodsModule { }
