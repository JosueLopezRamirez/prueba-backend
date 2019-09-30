import { Resolver, Query } from '@nestjs/graphql';
import { CountrieService } from './countrie.service';
import { countrieDto } from './countrie.dto';
import { Args, Int } from 'type-graphql';
import { GraphQLScalarType } from 'graphql';

@Resolver('Countries')
export class CountriesResolver {

    constructor(private countrieService: CountrieService){}

    @Query(() => [countrieDto])
    async countries(){
        return await this.countrieService.getAllCountries();
    }

    // @Query(() => [countrieDto])
    // async searchCountries(@PaginationArgs() { page, limit }: PaginationArgs) {
    //     let page: number = parseInt(`${my_page}`);
    //     let limit: number = parseInt(`${mylimit}`);;
    //     limit = limit > 100 ? 100 : limit;
    //     return await this.countrieService.paginate({page, limit});
    // }
}
