import { IsString, IsOptional, IsNumber, IsNumberString } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    code: string;

    @IsString()
    name: string;
    
    @IsNumber()
    latitude: number;
    
    @IsNumber()
    longitude: number;
}

export class UpdateLocationDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    name?: string;
    
    @IsNumber()
    @IsOptional()
    latitude?: number;
    
    @IsNumber()
    @IsOptional()
    longitude?: number;
}
