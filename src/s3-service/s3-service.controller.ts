import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { S3ServiceService } from './s3-service.service';
import { CreateS3ServiceDto } from './dto/create-s3-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('s3-service')
export class S3ServiceController {
  constructor(private readonly s3ServiceService: S3ServiceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    console.log('====================================');
    console.log(file);
    console.log('====================================');
    return this.s3ServiceService.create(file);
  }
}
