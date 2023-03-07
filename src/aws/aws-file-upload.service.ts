import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class AwsFileUploadService {
  private readonly s3: S3;
  private readonly awsBucketName: string;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    this.s3 = new AWS.S3();
    this.awsBucketName = process.env.AWS_BUCKET_NAME;
  }

  async uploadFile(path: string, file: MemoryStoredFile): Promise<string> {
    const key = `${path}/${randomUUID()}_${file.originalName}`;
    const params = {
      Bucket: this.awsBucketName,
      Key: key,
      Body: file.buffer,
    };

    try {
      await this.s3.putObject(params).promise();
    } catch (e) {
      throw Error(`image upload filed path: ${key}`);
    }
    return key;
  }

  async uploadMultiple(
    path: string,
    files: MemoryStoredFile[],
  ): Promise<Promise<string>[]> {
    return files.map(async (file) => await this.uploadFile(path, file));
  }
}
