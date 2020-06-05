import { IsString, IsInt } from 'class-validator'

export class CreateDogDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}