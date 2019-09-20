import { createParamDecorator } from "@nestjs/common";

export const BaseDecorator = createParamDecorator(async (data,req) => {
    const id = req.body.id;
    return id;
})