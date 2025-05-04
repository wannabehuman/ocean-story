import { IsString, IsOptional } from 'class-validator';

export class CreateFishKindDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    image_path?: string;
}

export class UpdateFishKindDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    image_path?: string;
} 