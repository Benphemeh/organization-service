import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ProducerRecordDto {
  @IsString({ message: 'topic must be a string' })
  @IsNotEmpty()
  topic: string;

  @IsArray()
  messages: { key?: string; value: string }[];
}
