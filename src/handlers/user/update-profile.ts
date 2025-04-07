import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { AccountModel } from "../../models/account";
import { HttpException } from "../../utils/http";

async function updateUserProfileHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { sub } = (req as CustomRequest).user;
  const { firstName, lastName, emailAdress, phoneNumber } = req.body;

  try {
    // Create an update object with only the provided fields
    const updateFields: any = {};

    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (emailAdress !== undefined) updateFields.emailAdress = emailAdress;
    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;

    // Check if there are any fields to update
    if (Object.keys(updateFields).length === 0) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "No fields provided for update"
      );
    }

    const user = await AccountModel.findByIdAndUpdate(sub, updateFields, {
      new: true,
    });

    if (!user) {
      throw new HttpException(HttpStatus.NotFound, "User not found");
    }

    res.status(HttpStatus.Ok).json({
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default updateUserProfileHandler;
