import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity({
    name :'weather_forecasts_H',
})
export class WeatherForecastsH{
    @PrimaryGeneratedColumn({
        type:'int',
    })
    id : number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    temperature_2m: number;

    @Column({
        type:'numeric',
        nullable:false,

    })
    relative_humidity_2m: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    dew_point_2m: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    precipitation_probability: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    precipitation: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    rain: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    snowfall: number;

    @Column({
        type:'numeric',
        nullable:false,
    })
    showers: number;

    @Column({
        type : 'numeric',
        nullable:false,
    })
    snow_depth : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    cloud_cover : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    cloud_cover_low : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    authorId : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    visibility : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    wind_speed_10m : number;
    @Column({
        type : 'numeric',
        nullable:false,
    })
    wind_direction_10m : number;

    @Column({
        type : 'numeric',
        nullable:false,
    })
    wind_gusts_10m: number;
}
