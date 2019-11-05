import { Resolver, Query, Args } from '@nestjs/graphql';
import { SkiperWalletsHistoryService } from './skiper-wallets-history.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('SkiperWalletsHistory')
export class SkiperWalletsHistoryResolver {
    constructor(
        private readonly skiperWalletHistoryService: SkiperWalletsHistoryService
    ) { }

    @Query('SkiperWalletsHistory')
    async SkiperWalletsHistory() {
        return await this.skiperWalletHistoryService.getAll();
    }

    @Query()
    async searchSkiperWalletHistory(@Args('id', ParseIntPipe) id: number) {
        return this.skiperWalletHistoryService.getById(id);
    }
}
