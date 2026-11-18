import { IsString } from 'class-validator';

export class GetInstitutionLink {
  @IsString()
  institutionId: string;

  @IsString()
  redirectUrl: string;
}

export class ValidateInstitution {
  @IsString()
  ref: string;
}
