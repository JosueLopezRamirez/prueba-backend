import { Injectable, Logger } from '@nestjs/common';
import { validate } from 'class-validator';

import { User } from './user.entity';
import { UserDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    private logger = new Logger('UserService');
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    //Get a all users
    async getAll(): Promise<User[]> {
    return await this.userRepository.find();
    }

    //Find user by id
    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    //Find user by email
    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email 
            }
        });
    }

    //Create a new user
    async create(user: UserDto) {
        await validate(user).then(errors => {
            if(errors.length > 0){
                this.logger.debug(`validation failed. errors: ${errors}`);
            }else{
                this.logger.debug("validation succeed");
            }
        })
        return this.userRepository.save(user);
        
    }

    //Update a user
    async update(user: User): Promise<User>{
        return this.userRepository.save(user);
    }

    //Delete a user
    async delete(user: User) {
        return this.userRepository.delete(user);
    }

    //Probando la validacion de las rutas
    async findByPayload(payload:any){
        const { user } = payload;
        return await this.userRepository.findOne({ user })
    }
}