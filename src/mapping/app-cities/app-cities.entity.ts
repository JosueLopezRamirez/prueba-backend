import { Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity('apps_cities')
export class AppCities {

    @PrimaryColumn() idapp: number;

    @PrimaryColumn() idcities: number;
}
