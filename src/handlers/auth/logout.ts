import { NextFunction, Request, Response } from "express";

async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  res.json({
    message: "Account Logged out",
  });
}

export default logoutHandler;
