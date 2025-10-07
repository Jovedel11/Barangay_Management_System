import type { Request, Response, NextFunction } from "express";
import { BrgyResident } from "@/models/brgy.resident";
import { DocsModel } from "@/models/documents.model";
import { ServiceRequest } from "@/models/brgy.services";
import { AccountModel } from "@/models/user.model";
import { BorrowRequestModel } from "@/models/borrow.items";
import { BrgyEvent } from "@/models/brgy.events";

const getDashboardStats = async (
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
      DocsModel.countDocuments({ status: "pending"}),
      ServiceRequest.countDocuments({ status: "pending"}),
      AccountModel.countDocuments({ status: "pending"}),
      BorrowRequestModel.countDocuments({ status: "pending"}),
      BrgyEvent.countDocuments({ status: "upcoming"}),
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

export { getDashboardStats };
