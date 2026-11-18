import {IsEmail, IsNumber, IsOptional, IsString} from 'class-validator';

export class GetProjects {
  @IsString()
  @IsOptional()
  tag: string;

  @IsString()
  @IsOptional()
  q: string;
}

export class CreateProjectBody {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  title: string

  @IsNumber()
  goal: number

  @IsString()
  image: string

  @IsOptional()
  tags: string[];

  @IsNumber()
  longitude = 0;

  @IsNumber()
  latitude = 0;
}

export class DonateToProjectBody {
  @IsNumber()
  amount: number;
}

export class DonateToProjectByCardBody {
  @IsNumber()
  amount: number;

  @IsString()
  successUrl: string;

  @IsString()
  cancelUrl: string;
}
