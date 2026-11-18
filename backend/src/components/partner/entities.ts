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

export class UpdateAssociationBody {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  longitude = 0;

  @IsNumber()
  @IsOptional()
  latitude = 0;
}

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

export class CreateActionBody {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  image: string
}

export class UpdateProjectBody {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  title: string

  @IsNumber()
  @IsOptional()
  goal: number

  @IsString()
  @IsOptional()
  image: string

  @IsOptional()
  tags: string[];

  @IsNumber()
  @IsOptional()
  longitude = 0;

  @IsNumber()
  @IsOptional()
  latitude = 0;
}
