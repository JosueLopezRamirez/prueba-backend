import { Controller, Post, UploadedFiles, UseInterceptors, Get, Res, Param, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import  {Storage} from '@google-cloud/storage';
import path, { extname } from 'path';
import { diskStorage } from 'multer'
import { createWriteStream, createReadStream } from 'fs';

@Controller()
export class AppController {

  // Asignando las credenciales al storage
  private storage = new Storage({
    keyFilename: path.join(__dirname,'../My_Project-e93f8f887af3.json'),
    projectId: 'prueba-de-storage-254017'
    // projectId: 'backend-alysystem'
  });

  private imgAppSkiperCommerceBucket = this.storage.bucket('mi-deposito-backend');
  
  constructor(private readonly appService: AppService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
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
  async uploadFile(@UploadedFile() file) {
    const { filename, path} = await file;
    await new Promise(res => {
      createReadStream(path)
      .pipe(
        this.imgAppSkiperCommerceBucket.file(filename).createWriteStream({
          resumable:false,
          gzip:true
        })
      )
      .on("finish",res)
    })
    console.log(`https://storage.cloud.google.com/mi-deposito-backend/${filename}`)
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image,@Res() res){
    return res.sendFile(image,{root: 'uploads'});
  }

  // Endpoint de prueba
  @Get('ads')
  async sendImages(){
    let array = [
      {
        // logo:'https://www.pinclipart.com/picdir/big/368-3688927_mcdonalds-logo-png-mcdonalds-logo-png-clipart.png',
        product:'https://i.dlpng.com/static/png/1547855-classic-angus-beef-burger-png-380_380_preview.png'
      },
      {
        // logo:'https://gretelgutierrezblog.files.wordpress.com/2016/01/carls-jr-tmj7iz.png?w=463&h=162',
        product:'https://uberblogapi.10upcdn.com/wp-content/uploads/sites/354/2016/08/carls-ags-newsroom-960x540.png'
      },
    ];
    let normalGet = [
      {
        name:`Carl's Jr.`,
        logo:'https://gretelgutierrezblog.files.wordpress.com/2016/01/carls-jr-tmj7iz.png?w=463&h=162',
        product:'https://uberblogapi.10upcdn.com/wp-content/uploads/sites/354/2016/08/carls-ags-newsroom-960x540.png',
        price: 15,
        description: 'cheeseburger and french fries'
      }
    ];
    // Retornando el body de la publicidad
    return {
      data: {
        error:[], ok:true, status: 200,
        data: {
          main: array,
          ads: normalGet
          }
        }
    }
  }
}

/*
 {
  "type": "service_account",
  "project_id": "prueba-de-storage-254017",
  "private_key_id": "6e969681a214d60d143bdbd2c7d6db99b03951fd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLRJVwWnhdWNbu\n937ZA+KNhW0Hf7NL+Dlgsa3MXhD3fZEdBMGZHi++9tMbAE0W4dO7ZmTqZN8SoH9b\nKHDD5vSEO8csGjM6Z0ZcLYfpiQ6usjs//j7NqjfTDH4H4ecsGfb3yK7FE3thv4ui\nH+IwGr3T0yeMwJX0MvVeU0gGUzd3JqTCcgVE3QwZwMdtDDMwcka+4mR7Ej2G4LSS\nIKKbYUiS+GmliphVxM+VhwHEeOjze68uh3AR9qXfaESkvjDJu99nWJYduXLX9cem\n+CVu28+RpdvmvWBFZeg0wdFqPVnf2rneexp9/vjly8FWiaEIobsdLKNqPjqbLWOa\n1/3zZ+yBAgMBAAECggEAAWrCm3BIBUeSpQMU72ydYlTvKgWYAYQzGzNV5bY0qlMF\n5VTEiD2bgdps5ZPqlamgnR51PuSR4Qp9JMyq/5SfOQJFLM+ocoRoi0k2eLhvwaRE\nsTkjpTGl9rrQMJwgrVAnhnnvzPgqLKfmEGzmOeVf1CeVT6ACk5uc1gng10lyeipH\nvsm1bqIoIsTfFuQ+1rYP57XV+6Asv1nUec7L/wT8CfnSrJdc5pdHu1aZ9zahZ2ON\nIRJeQiKddt87UQ21SAxrVKbXXj/ViOD5i77Qp/POj+JtN5aN9GZdL1wkQIOIrbU3\nbFv7EF+FdMN8uE16kmCWInGnTTePSLrb09CK+/EVSQKBgQDkt51IRk0DTR8snclf\n3Tr9Qjd+SpQk7BVZu3g72f3zJpy17U4o+GbIj3OhOtj84g1GX0nIegryut1DVcVk\n+f2dJbjWrzXaQsAnfWLlIiNuu4ANy6wMVlJFrXQ4xbIUOGcD3gzse0WuPvbjhESD\nDuMkBD+6/dEm54Avvi7w0C2QWQKBgQDjg9FSsMRqDtDkRn5NJpXY6yCZlgijaV89\nEFvi5qkhwVNIdwHQrXaARLc+LmCcABYT2dGJVXPfsjI6O2qin6cSqKDJiW/BXhT1\na0oVExjjAXB7YQbMOE0XTTI3sFxgfAPsB+iVnPn3Ern63bck65PbymNZitTgjLlJ\nnh3IS754aQKBgEpvm6eXAZ9ubRPnMk+Zv4YHE+ptOTOfBf/TLHlGJAkLavsmhUZ+\nOW1Sio5RiacbprhdcLTnS0LeH/63HmwTlD+dtD9ifINRMBpqC1KJPsDeEvnqbE8D\nlPkKT4XeiWtdQ+GVVd1s7SudYFqBhI6mvLPPEjK4QmaH90cSfVJwXjPZAoGBAN8F\n0YSgmPlqKqUK4TZZs5xe6KcFptQhL+XZCmnDOFpJe41Wc2YPFFGqioIezj896mZt\nJ/Ta2mqW8JuasO5XWFx3Bp5o5i8EPcFR+d3syYGFYLDhLNu1+QP1fVuPuw4to16V\nZg57QaFMLxlWi/haIafbnkYhTIoOCHe80m8MqNq5AoGBANT8jn0dt3ejNULEaGFs\nhiNY2a/cD5LOVgQs5YXZ6lgr8N7BAAspesNy9HhK2ge73oRuFHSTwPZky7/ralpk\n+zF3VWv24aYdmFoWvoKe/z+yZA4tHFxGKZ6/X2fj3PFVUlrhjRHRkXB2Ut9YET03\nXfIwlkb3u3MLXfQT5QJB1zkg\n-----END PRIVATE KEY-----\n",
  "client_email": "prueba-storage@prueba-de-storage-254017.iam.gserviceaccount.com",
  "client_id": "104074511895452684374",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/prueba-storage%40prueba-de-storage-254017.iam.gserviceaccount.com"
}

->

{
  "type": "service_account",
  "project_id": "backend-alysystem",
  "private_key_id": "f709b06d58fd67938d322db73a6d962147bd2421",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxaJq85/tlKcge\nojFyz0BnDrlYyQxPRGD1bC6BRfRa83KH4xtzh53olPCA36DH7ASzf1BrLkYTqLbW\nd/6deJxb3Pd/8jkT+CNaLjMStBuxN57uXFM6hMndPgc4Ag/HQGkEK7pwoOvZpTu9\nrN+5qspf53/iudYUCXlSHPHSIMtdN8gPfdaQKzOGe8YR96IjOp8jWiM4zvAf9ryx\ncUKEYgyo/e5HBDiz6/Hxz/cV4fKyuwhkiLQXP9mCYtA4k5hUzdfmuhM+tS1pPiQP\n7teqBJkXmE7l0u8QxPRp3UDId1XAk/p+lxfSVX0PyNA887TWf5XU80WZQinZXM9d\nBuLHtpVdAgMBAAECggEAKCum6gJfPrNcwG76YmRCUXOYjV2Mv4AcskWqLBRidZut\nQc6vXxQEse7TnGLGna44DErWM0a5kGcB64MlMJPoV7arhhmbSgXEP325i9Ejehe9\nkXxvTg9WRBXw/YId/4B6pvqdzzXo4ZHT+qljyT8+bsPVBcoNiuDwSyMJsIpDcho3\nt6kFhAQ9XDWa4nWt7s1jsq+a1m3jswAobISf/Uf16cS4bqxUaJYZjlrIytKXrWGA\nPJNtwx0/q3IdM87SkurZWpUPOOjVSf6JERxGJ+ziNr65bBZo0+0qndV00d0PLHPs\nZDP49b2s5EMKLaNuo6lWNjXBc2ESFl9MKEqpwE95AQKBgQDvLc8kz9vQDd/KK+CA\nGX1ZOL30XxC/t9d7YstQ2WsGUmWTDqyepVQk+mUZmaf0MLmnPFzXgWXHoFsM9Uu6\ngJ9zOVdItSvjTBUGcDMbHqUOStsnsirsf9H0/tLHior2moVa0KyfMREOnDt/CLxV\nUSbYvPGBAiGrYLvc2vtICvdQgQKBgQC94q3JHgyM+oDUMaQhG1a0rUSdf+CRkVRE\n/va9ecy63mLW56CvcP513ZzA1nPdDuBFt6xM0ApGCetAoz2LLrwBD6RVAUa7EclT\nuuGFUdkk1YDq4JyVIIgQqScd3XcLlVfiRpDkKXaw0WrTCKnh1dL7tNawU4/gmOqZ\n3GJ2ucsW3QKBgQC7bqyr7nAVxSmg522RNWhzqPHDNVSMyWcF/E/UVe13EM8kxRUl\nZe5g5BCiVTW3OQ/kLHudLnwySknQB9KGnxFVXJQ4GDICd7bqSrbiA8vZPXQs0YSt\nvSUt1xwa30kzI7hpiKoePnddebVuQcxFF8lXhAnFzYPRJ4dQ9hKBTIavAQKBgA5y\nQnp8mMPZAxghtrT2GYChdgjtg65PejPNmgQMUjEdXjOvZ6AxXoqlE5nwNtxol1N2\nh9tIMJ/nfUhrovEF2zPRdtUoxbLRxZljLGkyMu0EeUxlTkRiNzfdRqaVBMuSzx7d\n84QIS4lkRVZM4G/YDrcrqPG9ScLyn1aZV7xkojjZAoGAUp46o07wU7IVshsY3cUL\ntbQbp5x45A9nLrW0Lxo1h6cexTyjL/tgGP0qQwzS4zTNsUEL9w5oTeECQyD+hcBg\nkYUFkTCoi1MVdFVSQDdWA3G+Sz0KrziP9cEpCSvY5Q93oo6ZpeQ0LLZsCGawn7rB\nrRuQDjN6j392lrNDiPYDSi4=\n-----END PRIVATE KEY-----\n",
  "client_email": "adminstorage@backend-alysystem.iam.gserviceaccount.com",
  "client_id": "112737791854303123998",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/adminstorage%40backend-alysystem.iam.gserviceaccount.com"
}
  
 */