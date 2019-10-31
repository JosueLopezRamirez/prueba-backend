import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperAgent } from './skiper-agent.entity';
import { Repository } from 'typeorm';
import { AgentInput, AgentDriveInput } from './skiper-agent.dto';
import { UserService } from '../users/user.service';
import { CategoryAgentService } from '../category-agent/category-agent.service';
import { User } from '../users/user.entity';
require('isomorphic-fetch');

@Injectable()
export class SkiperAgentService {

    constructor(
        @InjectRepository(SkiperAgent) private agentRepository: Repository<SkiperAgent>,
        private readonly userService: UserService,
        private readonly categoryAgentService: CategoryAgentService
    ) { }

    async getAll() {
        return await this.agentRepository.find({ relations: ["user", "categoryAgent"] });
    }

    async getById(id: number) {
        return await this.agentRepository.findOne({
            relations: ["user", "categoryAgent"],
            where: { id: id }
        });
    }

    async GetDistance(origin, destination) {

        const toQueryParams = (object) => {
            return Object.keys(object)
                .filter(key => !!object[key])
                .map(key => key + "=" + encodeURIComponent(object[key]))
                .join("&")
        }

        const ReturnDist = async () => {
            const options = {
                key: "AIzaSyD_S3b75tC_Td7aq8oQLsr5-VX9FO1v2yc",
                mode: "Driving"
            };

            const queryParams = {
                origin: origin,
                destination: destination,
                ...options,
            };

            const url = `https://maps.googleapis.com/maps/api/directions/json?${toQueryParams(queryParams)}` + '&language=es';

            var x = await fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (json.status !== 'OK') {
                        const errorMessage = json.error_message || 'Unknown error';
                        return Promise.reject(errorMessage);
                    }
                    return json;
                });
            return x
        }
        return await ReturnDist()
    };

    async ObtenerDriveMasCercano(
        lat: number, lng: number,
        Drives: AgentDriveInput[]): Promise<number> {

        var c = await Promise.all(Drives.map(async item => {
            var Distancia = await this.GetDistance(
                lat.toString() + ',' + lng.toString(),
                item.lat.toString() + ',' + item.lng.toString())
            console.log(Distancia.routes[0].legs[0].distance.value)
            item.distancia = Distancia.routes[0].legs[0].distance.value
        }))

        var drive = Drives.sort(function (element1, element2) { return element1.distancia - element2.distancia })[0]
        return drive.iddrive
    }

    async getByUser(user: User) {
        try {
            return await this.agentRepository.findOne({
                where: { user: user }
            });
        } catch (error) {
            console.log(error)
        }
    }


    async register(agent: AgentInput) {
        try {
            let user = await this.userService.getUserById(agent.user_id);
            let category = await this.categoryAgentService.getById(agent.categoryAgent_id);
            if (user !== undefined && category !== undefined) {
                let agentInsert: SkiperAgent = this.parseAgent(agent, user, category);
                return await this.agentRepository.save(agentInsert);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(agent: AgentInput) {
        try {
            let agentUpdate = await this.getById(agent.id);
            if (agentUpdate !== undefined) {
                agentUpdate.state = agent.state;
                return await this.agentRepository.save(agentUpdate);
            }

        } catch (error) {
            console.log(error)
        }
    }

    private parseAgent(input: AgentInput, user?, category?): SkiperAgent {
        let agent: SkiperAgent = new SkiperAgent();
        agent.identity = input.identity;
        agent.state = input.state;
        agent.create_at = input.create_at;
        agent.user = user;
        agent.categoryAgent = category;
        return agent;
    }
}