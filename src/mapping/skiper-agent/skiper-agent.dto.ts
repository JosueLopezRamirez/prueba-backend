import { ObjectType, Field, InputType } from "type-graphql";
import { UserDto } from "../users/user.dto";
import { categoryDto } from "../category-agent/category-agent.dto";

@ObjectType()
export class SkiperAgentDto {
    id:number;
    state:boolean;
    identity:string;
    create_at:Date;
    categoryAgent:categoryDto;
    user:UserDto;
}

@InputType()
export class AgentInput {
    id:number;
    state:boolean;
    identity:string;
    create_at:Date;
    categoryAgent_id:number;
    user_id:number;
}