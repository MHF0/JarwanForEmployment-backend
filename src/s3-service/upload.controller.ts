import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { FileUploadService } from './s3-service.service';

@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileUploadService) {}

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const filePath = this.fileService.getFile(fileName);

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
