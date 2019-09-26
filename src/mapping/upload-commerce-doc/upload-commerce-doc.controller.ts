import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { UploadCommerceDocService } from './upload-commerce-doc.service';
import { SkiperDetailCommcerceService } from '../skiper-detail-commerce/skiper-detail-commerce.service';
import { UploadDocCommerceDto } from './dto';
import { UploadCommerceDoc } from './upload-commerce-doc.entity';
import { SkiperDetailCommerce } from '../skiper-detail-commerce/skiper-detail-commerce.entity';
import { BaseDecorator } from '../base.decorator';

@Controller('upload-commerce-doc')
export class UploadCommerceDocController {

    constructor(
        private this_service: UploadCommerceDocService,
        private skiper_detail_commerce_service: SkiperDetailCommcerceService
    ){}

    @Get('/all')
    async getAll() {
        let result = await this.this_service.getAll();
        if(result!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: result}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Get('/:id')
    async getById(@Param() id: number) {
        let resultAgent = await this.this_service.getById(id);
        if(resultAgent!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: resultAgent}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Post()
    async create(@Body() upload: UploadDocCommerceDto){
        let result = await this.skiper_detail_commerce_service.getById(upload.skiper_detail_commerce_id);
        if(result===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The user_id in the body dont exist in the database'} } }
        }else{
            let resultUpload = await this.parseEntity(upload,result);
            resultUpload = await this.this_service.create(resultUpload);
            if(resultUpload===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The Upload Commerce Doc is register successfuly',data: resultUpload}}
            }
        }   
    }

    @Put()
    async update(@Body() agent: UploadDocCommerceDto){
        let resultActual = await this.this_service.getById(agent.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Upload Commerce Doc - ID in the body dont exist in the database'} } }
        }else{
            resultActual = this.parseEntity(agent,resultActual.skiper_detail_commerce);
            resultActual.id = agent.id;
            resultActual = await this.this_service.create(resultActual);
            if(resultActual===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The Upload Commerce Doc is update successfuly',data: resultActual}}
            }
        }   
    }

    @Delete()
    async delete(@BaseDecorator() id){
        let resultActual = await this.this_service.getById(id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Upload Commerce Doc - ID in the body dont exist in the database'} } }
        }else{
            resultActual.id = id;
            let result = await this.this_service.delete(resultActual);
            if(result.affected > 0){
                return {data: { ok:true,status: 200, message: 'The Upload Commerce Doc is deleted successfuly'}}
            }
        }
    }

    private parseEntity(agent: UploadDocCommerceDto | UploadCommerceDoc, SDC?: SkiperDetailCommerce): UploadCommerceDoc{
        let result: UploadCommerceDoc = new UploadCommerceDoc();
        result.url_doc_identification_ruc = agent.url_doc_identification_ruc;
        result.url_trade_registration = agent.url_trade_registration;
        //
        result.url_doc_power_letter_one = agent.url_doc_power_letter_one;
        result.url_doc_power_letter_two = agent.url_doc_power_letter_two;
        result.url_doc_power_letter_three = agent.url_doc_power_letter_three;
        result.url_doc_power_letter_four = agent.url_doc_power_letter_four;
        //
        result.url_doc_commerce_outside_one = agent.url_doc_commerce_outside_one;
        result.url_doc_commerce_outside_two = agent.url_doc_commerce_outside_two;
        //
        result.url_doc_commerce_inside_one = agent.url_doc_commerce_inside_one;
        result.url_doc_commerce_inside_two = agent.url_doc_commerce_inside_two;
        result.url_doc_commerce_inside_three = agent.url_doc_commerce_inside_three;
        result.url_doc_commerce_inside_four = agent.url_doc_commerce_inside_four;
        //
        result.skiper_detail_commerce = SDC;
        return result;
    }
}
