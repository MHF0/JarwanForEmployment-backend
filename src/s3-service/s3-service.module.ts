import { Module } from '@nestjs/common';
import { FileUploadService } from './s3-service.service';
import { S3ServiceController } from './s3-service.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileController } from './upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Serve files from /uploads route
    }),
  ],
  controllers: [S3ServiceController, FileController],
  providers: [FileUploadService],
})
export class S3ServiceModule {}
