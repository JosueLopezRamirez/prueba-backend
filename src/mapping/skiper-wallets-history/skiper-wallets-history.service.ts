import { Injectable } from '@nestjs/common';
import { SkiperWalletsHistory } from './skiper-wallets-history.entity';
import { Repository } from 'typeorm';
import { SkiperWalletsHistoryInput } from './skiper-wallets-history.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkiperWalletsHistoryService {
    constructor(
        @InjectRepository(SkiperWalletsHistory)
        private readonly repository: Repository<SkiperWalletsHistory>
    ) { }

    async getAll(): Promise<SkiperWalletsHistory[]> {
        return await this.repository.find({ relations: ['skiperwallet', 'transactiontype', 'paymentmethod', 'currency'] });
    }
    async getById(id: number): Promise<SkiperWalletsHistory> {
        return await this.repository.findOneOrFail()
    }

    async registerSkiperWalletHistory(input: SkiperWalletsHistoryInput) {
        try {
            let result = this.parseSkiperWalletHistory(input);
            return await this.repository.save(result);
        } catch (error) {
            console.error(error);
        }
    }

    async updateSkiperWalletHistory(input: SkiperWalletsHistoryInput) {
        try {
            let result = await this.getById(input.id);
            if (result) {
                result.amount = input.amount;
                result.date_in = input.date_in;
                result.idcurrency = input.idcurrency;
                result.idpayment_methods = input.idpayment_methods;
                result.description = input.description;
                result.idskiperwallet = input.idskiperwallet;
                result.idtransactiontype = input.idtransactiontype;
                return await this.repository.save(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    private parseSkiperWalletHistory(input: SkiperWalletsHistoryInput): SkiperWalletsHistory {
        let skiperwallethistory: SkiperWalletsHistory = new SkiperWalletsHistory();
        skiperwallethistory.amount = input.amount;
        skiperwallethistory.date_in = input.date_in;
        skiperwallethistory.idcurrency = input.idcurrency;
        skiperwallethistory.idpayment_methods = input.idpayment_methods;
        skiperwallethistory.description = input.description;
        skiperwallethistory.idskiperwallet = input.idskiperwallet;
        skiperwallethistory.idtransactiontype = input.idtransactiontype;
        return skiperwallethistory;
    }
}
