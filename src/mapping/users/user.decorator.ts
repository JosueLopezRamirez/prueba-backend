import { createParamDecorator } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

export const UserDecorator = createParamDecorator(async (data,req) => {
    const body = req.body;
    body.password = await bcrypt.hash(body.password,10);
    return body;
})