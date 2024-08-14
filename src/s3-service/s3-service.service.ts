import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3ServiceService {
  private s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>(
        process.env.AWS_ACCESS_KEY_ID,
      ),
      secretAccessKey: this.configService.get<string>(
        process.env.AWS_SECRET_ACCESS_KEY,
      ),
      region: this.configService.get<string>(process.env.AWS_REGION),
    });
    this.bucketName = this.configService.get<string>(
      process.env.AWS_S3_BUCKET_NAME || 'cv-employee',
    );
  }
  async create(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const uploadParams = {
      Bucket: 'cv-employee',
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.s3.upload(uploadParams).promise();
      return data.Location;
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }
}
