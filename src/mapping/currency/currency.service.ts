import { Injectable } from '@nestjs/common';
import { Currency } from './currency.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyInput } from './currency.dto';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency) private readonly repository: Repository<Currency>
    ) { }

    async getAll(): Promise<Currency[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<Currency> {
        return await this.repository.findOneOrFail({ where: { id } });
    }

    async registerCurrency(input: CurrencyInput) {
        try {
            let result = this.parseCurrency(input);
            if (result) {
                return await this.repository.save(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async updateCurrency(input: CurrencyInput) {
        try {
            let result = await this.getById(input.id);
            result.name = input.name;
            return await this.repository.save(result);
        } catch (error) {
            console.error(error);
        }
    }

    private parseCurrency(input: CurrencyInput): Currency {
        let currency: Currency = new Currency();
        currency.name = input.name;
        return currency;
    }

}
