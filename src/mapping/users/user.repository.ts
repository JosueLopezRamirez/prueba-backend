import { User } from "./user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "./user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(user:UserDto) {
        return await this.save(user);
    }
}