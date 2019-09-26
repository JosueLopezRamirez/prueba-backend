import { Controller, Delete, Body, Put, Post, Get, Param } from '@nestjs/common';
import { BaseDecorator } from '../base.decorator';
import { UploadSkiperDocService } from './upload-skiper-doc.service';
import { SkiperDetailVehicleService } from '../skiper-detail-vehicle/skiper-detail-vehicle.service';
import { UploadDocVehicleDto } from './dto';
import { UploadSkiperDoc } from './upload-skiper-doc.entity';
import { SkiperDetailVehicle } from '../skiper-detail-vehicle/skiper-detail-vehicle.entity';

@Controller('upload-skiper-doc')
export class UploadSkiperDocController {
    
    constructor(
        private this_service: UploadSkiperDocService,
        private skiper_detail_service: SkiperDetailVehicleService
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
    async create(@Body() upload: UploadDocVehicleDto){
        let result = await this.skiper_detail_service.getById(upload.skiper_detail_vehicle_id);
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
    async update(@Body() agent: UploadDocVehicleDto){
        let resultActual = await this.this_service.getById(agent.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Upload Commerce Doc - ID in the body dont exist in the database'} } }
        }else{
            resultActual = this.parseEntity(agent,resultActual.skiper_detail_vehicle);
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

    private parseEntity(agent: UploadDocVehicleDto | UploadSkiperDoc, SDV?: SkiperDetailVehicle): UploadSkiperDoc{
        let result: UploadSkiperDoc = new UploadSkiperDoc();
        result.url_doc_insurance = agent.url_doc_insurance;
        result.url_doc_vehicle_circulation = agent.url_doc_vehicle_circulation;
        result.url_doc_mechanical_inspection = agent.url_doc_mechanical_inspection;
        result.url_doc_gas_emission = agent.url_doc_gas_emission;
        result.url_doc_license_plate = agent.url_doc_license_plate;
        result.url_doc_vehicle_front = agent.url_doc_vehicle_front;
        result.url_doc_vehicle_behind = agent.url_doc_vehicle_behind;
        result.url_doc_vehicle_side_right = agent.url_doc_vehicle_side_right;
        result.url_doc_vehicle_side_left = agent.url_doc_vehicle_side_left;
        result.url_doc_vehicle_inside_one = agent.url_doc_vehicle_inside_one;
        result.url_doc_vehicle_inside_two = agent.url_doc_vehicle_inside_two;
        result.url_doc_vehicle_inside_three = agent.url_doc_vehicle_inside_three;
        result.url_doc_vehicle_inside_four = agent.url_doc_vehicle_inside_four;
        result.skiper_detail_vehicle = SDV;
        return result;
    }
}
