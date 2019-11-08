import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SkiperWalletService } from './skiper-wallet.service';
import { ParseIntPipe } from '@nestjs/common';
import { SkiperWalletInput } from './skiper-wallet.dto';

@Resolver('SkiperWallet')
export class SkiperWalletResolver {
    constructor(private readonly skiperWalletService: SkiperWalletService) { }

    @Query('skiperwallets')
    async skiperwallets() {
        return this.skiperWalletService.getAll();
    }

    @Query()
    async searchSkiperWallet(@Args('id', ParseIntPipe) id: number) {
        return this.skiperWalletService.getById(id);
    }

    @Mutation()
    registerSkiperWallet(@Args('input') input: SkiperWalletInput) {
        try {
            return this.skiperWalletService.registerSkiperwallet(input);
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation()
    async updateSkiperWallet(@Args('input') input: SkiperWalletInput) {
        try {
            return await this.skiperWalletService.updateSkiperWallet(input);
        } catch (error) {
            console.error(error);
        }
    }


}
