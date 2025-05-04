import { IsString, IsOptional } from 'class-validator';

export class CreateFishMissionDto {
    @IsString()
    user_nm: string;

    @IsString()
    @IsOptional()
    fish_type1: string;

    @IsString()
    @IsOptional()
    fish_type2: string;

    @IsString()
    @IsOptional()
    fish_type3: string;

    @IsString()
    @IsOptional()
    fish_type4: string;

    @IsString()
    @IsOptional()
    fish_type5: string;
}

export class UpdateFishMissionDto {
    @IsString()
    @IsOptional()
    fish_type1?: string;

    @IsString()
    @IsOptional()
    fish_type2?: string;

    @IsString()
    @IsOptional()
    fish_type3?: string;

    @IsString()
    @IsOptional()
    fish_type4?: string;

    @IsString()
    @IsOptional()
    fish_type5?: string;
} 