import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { MemoryStoredFile } from 'nestjs-form-data';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsFileUploadService {
  private readonly s3: S3;
  private readonly awsBucketName: string;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
      },
    });
    this.s3 = new AWS.S3();
    this.awsBucketName = configService.get<string>('AWS_BUCKET_NAME');
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
      Logger.warn(e);
      throw new BadRequestException(`image upload filed path: ${key}`);
    }
    return key;
  }

  async uploadMultiple(
    path: string,
    files: MemoryStoredFile[],
  ): Promise<string[]> {
    const result: string[] = [];
    for (const file of files) {
      result.push(await this.uploadFile(path, file));
    }
    return result;
  }
}
