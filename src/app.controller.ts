import { Controller, Post, UploadedFiles, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFiles() file) {
    console.log(file);
  }

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
