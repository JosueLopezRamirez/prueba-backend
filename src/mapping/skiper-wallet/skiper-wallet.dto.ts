import { InputType, ObjectType } from 'type-graphql';
import { UserDto } from '../users/user.dto';
import { CurrencyDto } from '../currency/currency.dto';
import { countrieDto } from '../countries/countrie.dto';

@InputType()
export class SkiperWalletInput {
    id: number;
    iduser: number;
    amount: number;
    idcurrency: number;
    idcountry: number;
    date_in: Date;
}

@ObjectType()
export class SkiperWalletDto {
    id: number;
    iduser: UserDto;
    amount: number;
    idcurrency: CurrencyDto;
    idcountry: countrieDto;
    date_in: Date;
}