import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInput } from './user.dto';
import { CitiesService } from '../cities/cities.service';
import { CountrieService } from '../countries/countrie.service';
import { UserCivilStatusService } from '../user-civil-status/user-civil-status.service';

@Injectable()
export class UserService {

    private logger = new Logger('UserService');

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly city: CitiesService,
        private readonly country: CountrieService,
        private readonly civil: UserCivilStatusService
    ) { }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find({ relations: ["country", "city"] });
        } catch (error) {
            console.log(error)
        }
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: ["country", "city"]
        });
    }

    async findBySponsorId(id: number) {
        return await this.userRepository.find({
            where: { sponsor_id: id },
            relations: ["country", "city"]
        });
    }

    //Usando paginacion para cargar los usuarios
    async userPages(page: number = 1): Promise<User[]> {
        const countries = await this.userRepository.find({
            take: 25,
            skip: 25 * (page - 1),
            order: { id: 'ASC' }
        });
        return countries;
    }

    async findByPhone(phone: string): Promise<User> {
        return await this.userRepository.findOne({ phone });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            relations: ["country", "city", "civilStatus"],
            where: {
                email: email
            }
        });
    }

    //Create a new user
    async create(input: UserInput) {
        let city;
        let civil_status;
        try {
            console.log(input.city_id, input.idcivil_status)
            if (input.city_id !== undefined && input.idcivil_status !== undefined) {
                city = await this.city.getById(input.city_id);
                civil_status = await this.civil.getById(input.idcivil_status);
            } else {
                city = null;
                civil_status = null;
            }
            let country = await this.country.getById(input.country_id);
            let sponsor = await this.findById(input.sponsor_id);
            if (sponsor !== undefined) {
                if (city !== undefined && country !== undefined && civil_status !== undefined) {
                    let user: User = this.parseUser(input, city, country, civil_status);
                    return await this.userRepository.save(user);
                }
                return null;
            }
            return sponsor;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    //Update a user
    async update(input: UserInput): Promise<User> {
        try {
            let userUpdate = await this.findById(input.id);
            userUpdate.firstname = input.firstname;
            userUpdate.lastname = input.lastname;
            userUpdate.email = input.email;
            userUpdate.password = input.password;
            userUpdate.country = await this.country.getById(input.country_id);
            userUpdate.phone = input.phone;
            return await this.userRepository.save(userUpdate);
        } catch (error) {
            console.log(error)
        }
    }

    async updateOnlineStatus(user: User) {
        try {
            user.is_online = true;
            let result = await this.userRepository.save(user);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async updateAvatarImage(id:number,image:string){
        try {
            let user = await this.findById(id);
            user.avatar = image;
            return await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
        }
    }

    async getAvatarImage(id:number){
        try {
            let user = await this.findById(id);
            if(user){
                return user.avatar;
            }
            return 'Usuario no existe'
        } catch (error) {
            console.log(error)
        }
    }

    async logout(id: number) {
        try {
            let user = await this.findById(id);
            user.is_online = false;
            let result = await this.userRepository.save(user);
            return (result) ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async findByPayload(payload: any) {
        const { user } = payload;
        return await this.userRepository.findOne({ user })
    }

    // Metodo para parsear de UserInput a User
    parseUser(input: UserInput, city?, country?, civil_status?): User {
        let user: User = new User();
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.sponsor_id = input.sponsor_id;
        user.email = input.email;
        user.user = input.user;
        user.password = input.password;
        user.address = input.address;
        user.phone = input.phone;
        user.create_at = input.create_at;
        user.date_birth = input.date_birth;
        user.avatar = input.avatar;
        user.city = city;
        user.country = country;
        user.civilStatus = civil_status;
        return user;
    }
}