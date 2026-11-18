import { IsDecimal } from 'class-validator';

export class VerifyCoordinates {
  @IsDecimal()
  longitude: number

  @IsDecimal()
  latitude: number
}
