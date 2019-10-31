import { Injectable } from '@nestjs/common';
import { SkiperCommerceFavorite } from './skiper-commerce-favorites.entity';
import { SkiperCommerceFavoritesInput } from './skiper-commerce-favorites.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperCommerceFavoritesService {
    constructor(
        @InjectRepository(SkiperCommerceFavorite) private readonly repository: Repository<SkiperCommerceFavorite>
    ) { }

    async getAll(): Promise<SkiperCommerceFavorite[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            console.error(error);
        }
    }


    private parseSkiperCommerceFavorite(input: SkiperCommerceFavoritesInput): SkiperCommerceFavorite {
        let skipercommercefavorite: SkiperCommerceFavorite = new skipercommercefavorite();
    }
}
