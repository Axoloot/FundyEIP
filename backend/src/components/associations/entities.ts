import {IsEmail, IsNumber, IsOptional, IsString} from 'class-validator';

export class GetAssociations {
  @IsString()
  @IsOptional()
  tag: string;

  @IsString()
  @IsOptional()
  q: string;
}

export class CreateAssociationBody {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  longitude = 0;

  @IsNumber()
  latitude = 0;
}
