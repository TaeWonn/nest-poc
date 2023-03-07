import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message: string | undefined) {
    if (message) {
      super(message, HttpStatus.BAD_REQUEST);
    } else {
      super('Forbidden', HttpStatus.BAD_REQUEST);
    }
  }
}
