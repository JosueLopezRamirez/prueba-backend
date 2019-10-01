import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    private logger = new Logger('UserService');
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async getAll(): Promise<User[]> {
        return await this.userRepository.find({relations:["countrie","city"]});
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {id:id}
        });
    }

    async findByPhone(phone:string):Promise<User>{
        return await this.userRepository.findOne({
            where:{
                phone: phone
            }
        });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email 
            }
        });
    }

    //Create a new user
    async create(user: User|UserDto) {
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

    async findByPayload(payload:any){
        const { user } = payload;
        return await this.userRepository.findOne({ user })
    }
}