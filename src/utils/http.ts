import { HttpStatus } from "../types/http";

export class HttpException extends Error {
  status: HttpStatus;
  message: string;
  constructor(status: HttpStatus, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
