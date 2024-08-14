import { PartialType } from '@nestjs/mapped-types';
import { CreateS3ServiceDto } from './create-s3-service.dto';

export class UpdateS3ServiceDto extends PartialType(CreateS3ServiceDto) {}
