import { InputType, ObjectType } from "type-graphql";
import { SkiperWalletDto } from '../skiper-wallet/skiper-wallet.dto';
import { TransactionTypeDto } from '../transaction-type/transaction-type.dto';
import { PaymentMethodsDto } from '../payment-methods/payment-methods.dto';
import { CurrencyDto } from '../currency/currency.dto';

@InputType()
export class SkiperWalletsHistoryInput {
    id: number;
    idskiperwallet: number;
    idtransactiontype: number;
    amount: number;
    idpayment_methods: number;
    date_in: Date;
    idcurrency: number;
}

@ObjectType()
export class SkiperWalletsHistoryDto {
    id: number;
    skiperwallet: SkiperWalletDto;
    transactiontype: TransactionTypeDto;
    amount: number;
    paymentmethod: PaymentMethodsDto;
    date_in: Date;
    currency: CurrencyDto;
}