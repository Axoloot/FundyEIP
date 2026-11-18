import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ModifyUser {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsBoolean()
  @IsOptional()
  isVerified: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['en', 'fr', 'es'])
  lang: string;

  @IsBoolean()
  @IsOptional()
  darkMode: boolean;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsNumber()
  @IsOptional()
  roundedTo: number;
}

export const userSelection: Required<Prisma.UserSelect> = {
  id: true,
  pg: true,
  lang: true,
  email: true,
  password: false,
  lastname: true,
  firstname: true,
  isVerified: true,
  createdAt: true,
  updatedAt: true,
  piggyBank: true,
  roundedTo: true,
  passwordResetToken: true,
  Transactions: true,
  profilePicture: true,
  paypalAccessToken: true,
  paypalLastRefresh: true,
  paypalRefreshToken: true,
  trueLayerAccessToken: true,
  trueLayerLastRefresh: true,
  deviceNotificationToken: true,
  FollowedProjects: true,
  FollowedAssociation: true,
  stripeCustomerId: true,
  darkMode: true,
  OnwedAssociations: true,
  OwnedProjects: true,
  bankAccounts: true,
  type: true,
  Donations: true,
  _count: true,
  nordigenRequisitions: true,
};

export class ModifyProfilePictureBody {
  @IsString()
  picture: string;
}
