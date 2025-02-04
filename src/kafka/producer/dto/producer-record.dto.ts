import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ProducerRecordDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsArray()
  messages: { key?: string; value: string }[];
}
