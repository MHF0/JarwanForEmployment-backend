import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly uploadPath = path.join(__dirname, '..', '..', 'uploads');
  constructor() {
    // this.uploadPath = path.join(__dirname, '..', '..', 'uploads'); // Define the uploads folder

    // Ensure the uploads folder exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Generate a unique filename
    const filename = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join(this.uploadPath, filename);

    try {
      // Save the file to the server
      fs.writeFileSync(filePath, file.buffer);

      // Return the file path or URL (adjust as needed)
      return `${filename}`;
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  getFile(fileName: string): string {
    const filePath = path.join(this.uploadPath, fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return filePath;
  }
}
