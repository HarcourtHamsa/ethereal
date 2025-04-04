import { NextFunction, Request, Response } from "express";
import { AccountRole } from "../types/account";
import { CustomRequest, HttpStatus } from "../types/http";

function roleMiddleware(
  requiredRoles: AccountRole[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as CustomRequest;

    if (requiredRoles.includes(user.role as AccountRole)) {
      return res.status(HttpStatus.Forbidden).json({ error: "Forbidden" });
    }

    next();
  };
}

export default roleMiddleware;
