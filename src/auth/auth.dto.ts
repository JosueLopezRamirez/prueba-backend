import { ObjectType, InputType } from "type-graphql";

@InputType()
export class signInDto {
    email:string;
    password:string;
}

// export class CommerceOut {

//     constructor(id,){

//     }

//     id: number;
//     name_owner: string
//     identity: string
//     url_doc_identity: string
//     state: boolean
//     // user: UserDto
// }


@ObjectType()
export class SignInOk {

    constructor(token,firstname,lastname,username,email,phone_number){
        this.token = token;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.phone_number = phone_number;
    }

    token: string
    firstname: string
    lastname: string
    username: string
    email: string
    phone_number: string
    // commerce:CommerceOut
}

@ObjectType()
export class ErrorResponse {

    constructor(message?,status?,ok?){
        this.message = message || null;
        this.status = status || null;;
        this.ok = ok || null;
    }

    message: string;
    status: number;
    ok: boolean;
}

@ObjectType()
export class SignResponse {

    constructor(data,error){
        this.data = data;
        this.error = error
    }

    data:SignInOk;
    error:ErrorResponse;
}

@InputType()
export class twilioDto {

    phone_number: string;
    channel?: string;
    code?: string;
}