import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class NewsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(60)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  article: string;
}
