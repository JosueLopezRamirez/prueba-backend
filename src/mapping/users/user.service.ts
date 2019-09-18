import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

// import { ChatGateway } from 'src/chat/chat.gateway';
import { User } from './user.entity';
import { UserDto } from './user.dto';


@Injectable()
export class UserService {

    private logger = new Logger('UserService')
    // private chatGateway: ChatGateway
    constructor(
        // private readonly chatGateway: ChatGateway,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

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