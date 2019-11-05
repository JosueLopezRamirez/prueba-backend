import { Injectable } from '@nestjs/common';
import { PaymentMethods } from './payment-methods.entity';
import { Repository } from 'typeorm';
import { PaymentMethodsInput } from './payment-methods.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PaymentMethodsService {
    constructor(
        @InjectRepository(PaymentMethods)
        private readonly respository: Repository<PaymentMethods>
    ) { }

    async getAll(): Promise<PaymentMethods[]> {
        return await this.respository.find();
    }

    async getById(id: number): Promise<PaymentMethods> {
        return await this.respository.findOneOrFail({ where: { id } });
    }

    async registerPaymentMethod(input: PaymentMethodsInput) {
        try {
            let respt = this.parsePaymentMethods(input);
            return await this.respository.save(respt);
        } catch (error) {
            console.error(error);
        }
    }

    async updatePaymentMethod(input: PaymentMethodsInput) {
        try {
            let respt = await this.getById(input.id);
            if (respt) {
                respt.name = input.name;
                return await this.respository.save(respt);
            }

        } catch (error) {
            console.error(error);
        }
    }

    private parsePaymentMethods(input: PaymentMethodsInput): PaymentMethods {
        let paymentmethods: PaymentMethods = new PaymentMethods();
        paymentmethods.name = input.name;
        return paymentmethods;
    }
}
