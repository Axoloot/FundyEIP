import { IsInt, IsString } from 'class-validator';

export class CreatePotBody {
  @IsInt()
  amount: number

  @IsString()
  name: string

  @IsString()
  description: string
}
