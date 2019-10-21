import { Resolver, Args, Mutation } from '@nestjs/graphql';
import path, { extname } from 'path';
import { Storage } from '@google-cloud/storage';
import * as base64 from 'base64-img';

@Resolver('ImageUpload')
export class ImageUploadResolver {

    private storage = new Storage({
        keyFilename: path.join(__dirname, '../My_Project-e93f8f887af3.json'),
        projectId: 'prueba-de-storage-254017'
    });

    private imgAppSkiperCommerceBucket = this.storage.bucket('mi-deposito-backend');

    @Mutation()
    async uploadBase64(@Args('imageBase64') imageBase64: string) {
        try {
            console.log(imageBase64)
            let filePath = await base64.imgSync(imageBase64, './uploads', 'avatar');

            this.imgAppSkiperCommerceBucket.upload(__dirname.slice(0, -15) + filePath, {
                destination: 'profile-images/576dba00c1346abe12fb502a-original.jpg',
                public: true,
                validation: 'md5'
            }, function (error, file) {

                if (error) {
                    console.error(error);
                }

                return 'Image uploaded';
            });
        } catch (error) {
            console.log(error)
        }
    }
}
