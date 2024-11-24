import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileUploadService } from './s3-service.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('s3-service')
export class S3ServiceController {
  constructor(private readonly s3ServiceService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    console.log('====================================');
    console.log(file);
    console.log('====================================');
    return this.s3ServiceService.upload(file);
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const filePath = this.s3ServiceService.getFile(fileName);

      // Set appropriate headers for the response
      res.sendFile(filePath, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
