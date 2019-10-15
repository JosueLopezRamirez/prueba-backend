import { Controller, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { createReadStream } from 'fs';
import path, { extname } from 'path';
import { Storage } from '@google-cloud/storage';
import { AppService } from './app.service';
import { ErrorResponse } from './auth/auth.dto';

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) { }

    // Asignando las credenciales al storage
    private storage = new Storage({
        keyFilename: path.join(__dirname, '../My_Project-e93f8f887af3.json'),
        projectId: 'prueba-de-storage-254017'
    });

    private imgAppSkiperCommerceBucket = this.storage.bucket('mi-deposito-backend');

    @Post('/image/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadFile(@UploadedFile('file') file) {
        const { filename, path } = await file;
        await new Promise(res => {
            createReadStream(path)
                .pipe(
                    this.imgAppSkiperCommerceBucket.file(filename).createWriteStream({
                        resumable: false,
                        gzip: true
                    })
                )
                .on("finish", res)
        })
        return new ErrorResponse(`https://storage.cloud.google.com/mi-deposito-backend/${filename}`,200,true);
    }
}
