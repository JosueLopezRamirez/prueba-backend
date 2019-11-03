import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { SkiperCommerceFavorite } from './skiper-commerce-favorites.entity';
import { SkiperCommerceFavoritesInput } from './skiper-commerce-favorites.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperCommerceFavoritesService {
=======
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperCommerceFavorite } from './skiper-commerce-favorites.entity';
import { Repository } from 'typeorm';
import { CommerceFavoriteInput, OkDto } from './skiper-commerce-favorites.dto';

@Injectable()
export class SkiperCommerceFavoritesService {

>>>>>>> 7a79b878b592a7c3ea50f4502a9a1462e62f1431
    constructor(
        @InjectRepository(SkiperCommerceFavorite) private readonly repository: Repository<SkiperCommerceFavorite>
    ) { }

<<<<<<< HEAD
    async getAll(): Promise<SkiperCommerceFavorite[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            console.error(error);
        }
    }


    private parseSkiperCommerceFavorite(input: SkiperCommerceFavoritesInput): SkiperCommerceFavorite {
        let skipercommercefavorite: SkiperCommerceFavorite = new skipercommercefavorite();
=======
    async getAllByUserId(id: number) {
        try {
            let result = await this.repository.find({
                relations: ["skiperCommerce"],
                where: { iduser: id }
            });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async create(input: CommerceFavoriteInput) {
        let ok = new OkDto();
        let favorite = this.parseFavorite(input);
        let result = await this.repository.save(favorite);
        ok.ok = (result) ? true : false;
        return ok;
    }

    async delete(id: number) {
        let ok = new OkDto();
        try {
            let favorite = await this.repository.findOneOrFail({ id });
            if (favorite) {
                let result: any = await this.repository.delete(favorite);
                ok.ok = (result.raw.affectedRows > 0 )? true : false;
                return ok;
            }
        } catch (error) {
            console.log(error);
            ok.ok = false;
            return ok;
        }
    }

    private parseFavorite(input: CommerceFavoriteInput) {
        let favorite = new SkiperCommerceFavorite();
        favorite.idcommerce = input.commerce_id;
        favorite.iduser = input.user_id;
        return favorite;
>>>>>>> 7a79b878b592a7c3ea50f4502a9a1462e62f1431
    }
}
