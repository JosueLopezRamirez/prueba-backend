import { Module } from '@nestjs/common';
import { SkiperWalletService } from './skiper-wallet.service';
import { SkiperWalletResolver } from './skiper-wallet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperWallet } from './skiper-wallet.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([SkiperWallet])
  ],
  providers: [SkiperWalletService, SkiperWalletResolver],
  exports:[SkiperWalletService]
})
export class SkiperWalletModule {}
