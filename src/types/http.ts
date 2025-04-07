import { Request } from "express";

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  Conflict = 409,
}

export type CustomRequest = Request & {
  user: { id: string; role: string; sub: string };
};
