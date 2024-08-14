import { Module } from '@nestjs/common';
import { S3ServiceService } from './s3-service.service';
import { S3ServiceController } from './s3-service.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
  ],
  controllers: [S3ServiceController],
  providers: [S3ServiceService],
})
export class S3ServiceModule {}
