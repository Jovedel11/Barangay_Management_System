import { AccountModel } from "@/models/user.model";
import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

type Update = {
  model: Model<any>;
  sendNotif?: boolean;
  detailsToSend?: string;
  linkToSend?: string;
  isItem?: boolean;
  sendToResident?: boolean;
};

const createResidents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = matchedData(req);
      const resident = await CollectionModel.create({ ...data });
      resident.save();
      return res.status(201).json({
        message: "Resident successfully created",
      });
    } catch (error) {
      console.log("Error in creating event :", error);
      next(error);
    }
  };
};

const deleteResidents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Resident controller: Invalid fields");
      }
      const { resident_id } = matchedData(req);
      const { deletedCount } = await CollectionModel.deleteOne({
        _id: resident_id,
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Resident not found" });
      }
      return res.status(200).json({ message: "Resident successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id } = matchedData(req);
    const resident = await AccountModel.findById({ _id: user_id });
    return res.status(201).json([resident]);
  } catch (error) {
    console.log("Error in creating event :", error);
    next(error);
  }
};

const updateAccount = ({ model: CollectionModel }: Update) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request Body: ", req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Docs : Invalid fields");
      }
      const data = matchedData(req);
      const { user_id, status } = data;
      const user = await AccountModel.findOne(
        { _id: user_id },
        { first_name: 1, last_name: 1, email: 1 }
      );
      if (!user) throw new Error("Cannot find the user (update account)");
      const { matchedCount, modifiedCount } = await CollectionModel.updateOne(
        { _id: user_id },
        { $set: { status } }
      );

      if (matchedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }

      if (modifiedCount === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No changes made to the document" });
      }
      return res.status(200).json({
        success: true,
        message: "Document successfully updated",
        email: user.email,
        status,
        full_name: `${user.first_name} ${user.last_name}`,
      });
    } catch (error) {
      next(error);
    }
  };
};

export { createResidents, deleteResidents, getProfile, updateAccount };
