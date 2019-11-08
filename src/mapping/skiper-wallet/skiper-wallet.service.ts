import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkiperWallet } from './skiper-wallet.entity';
import { SkiperWalletInput } from './skiper-wallet.dto';

@Injectable()
export class SkiperWalletService {
    constructor(
        @InjectRepository(SkiperWallet)
        private readonly repository: Repository<SkiperWallet>
    ) { }

    async getAll(): Promise<SkiperWallet[]> {
        return await this.repository.find({ relations: ["userID", "currencyID", "countryID"] });
    }

    async getById(id: number): Promise<SkiperWallet> {
        return await this.repository.findOne(
            {
                relations: ["userID", "currencyID", "countryID"],
                where: { id }
            }
        );
    }

    async registerSkiperwallet(input: SkiperWalletInput) {
        try {
            let result = this.parseSkiperWallet(input);
            result = await this.repository.save(result);
            return result;
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al registrar la wallet',HttpStatus.NOT_FOUND)
        }
    }

    async updateSkiperWallet(input: SkiperWalletInput) {
        try {
            let result = await this.getById(input.id);
            if (result) {
                result.iduser = input.iduser;
                result.idcountry = input.idcountry;
                result.idcurrency = input.idcurrency;
                result.amount = input.amount;
                result.date_in = input.date_in;
                return await this.repository.save(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getSaldoHabilitado(idwallet:number){
        
    }

    private parseSkiperWallet(input: SkiperWalletInput): SkiperWallet {
        let skiperwallet: SkiperWallet = new SkiperWallet();
        skiperwallet.iduser = input.iduser;
        skiperwallet.amount = input.amount;
        skiperwallet.idcountry = input.idcountry;
        skiperwallet.date_in = input.date_in;
        skiperwallet.idcurrency = input.idcurrency;
        skiperwallet.date_in = input.date_in;
        skiperwallet.minimun = input.minimun;
        skiperwallet.bretirar = input.bretirar;
        return skiperwallet;
    }
}
