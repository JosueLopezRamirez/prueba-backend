import { Controller, UseInterceptors, UploadedFile, Post, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path, { extname } from 'path';
import { AppService } from './app.service';
import { ErrorResponse } from './auth/auth.dto';
// ------------------------------------------------------------------
import * as  multer from 'multer';
import * as express from 'express';
import MulterGoogleCloudStorage from 'multer-google-storage';

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    @Post('/image/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: new MulterGoogleCloudStorage({
            bucket: 'mi-deposito-backend',
            projectId: 'prueba-de-storage-254017',
            keyFilename: path.join(__dirname, '../My_Project-e93f8f887af3.json')
        })
    }))
    async uploadFile(@UploadedFile('file') file, @Req() req, @Res() res) {
        console.log(req.files);
        const { filename } = await file;
        console.log(filename);
        return new ErrorResponse(`https://storage.cloud.google.com/mi-deposito-backend/${filename}`, 200, true);
    }
}
