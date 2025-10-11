import type { Request, Response, NextFunction } from "express";
import { BrgyResident } from "@/models/brgy.resident";
import { DocsModel } from "@/models/documents.model";
import { ServiceRequest } from "@/models/brgy.services";
import { AccountModel } from "@/models/user.model";
import { BorrowRequestModel } from "@/models/borrow.items";
import { BrgyEvent } from "@/models/brgy.events";
import { matchedData, validationResult } from "express-validator";

const adminDashboardStats = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const [
      residentsCount,
      documentsCount,
      servicesCount,
      accountsCount,
      borrowRequestsCount,
      eventsCount,
    ] = await Promise.all([
      BrgyResident.countDocuments(),
      DocsModel.countDocuments({ status: "pending" }),
      ServiceRequest.countDocuments({ status: "pending" }),
      AccountModel.countDocuments({ status: "pending" }),
      BorrowRequestModel.countDocuments({ status: "pending" }),
      BrgyEvent.countDocuments({ status: "upcoming" }),
    ]);

    const stats = {
      residents: residentsCount,
      documents: documentsCount,
      services: servicesCount,
      accounts: accountsCount,
      borrowRequests: borrowRequestsCount,
      events: eventsCount,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const residentDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Check the User ID type or if it's not missing" });
    }
    const { userID } = matchedData(req);
    const [documentsCount, servicesCount, borrowRequestsCount, eventsCount] =
      await Promise.all([
        DocsModel.countDocuments({ user: userID, status: "pending" }),
        ServiceRequest.countDocuments({ user: userID, status: "pending" }),
        BorrowRequestModel.countDocuments({ user: userID, status: "pending" }),
        BrgyEvent.countDocuments({ status: "upcoming" }),
      ]);

    const stats = {
      documents: documentsCount,
      services: servicesCount,
      borrowRequests: borrowRequestsCount,
      events: eventsCount,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    next(error);
  }
};

const getDocsRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Check the User ID type or if it's not missing" });
    }
    const { userID } = matchedData(req);
    const result = await DocsModel.find({ user: userID, status: "pending" });
    if (!result) {
      return res.status(404).json({ message: "Docs not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { adminDashboardStats, residentDashboardStats, getDocsRequest };
