import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string | undefined) {
    if (message) {
      super(message, HttpStatus.FORBIDDEN);
    } else {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
