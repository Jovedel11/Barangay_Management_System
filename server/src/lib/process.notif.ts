import { AccountModel } from "@/models/user.model";
import NotifModel from "@/models/notification";
import { Schema } from "mongoose";
import { io } from "@/App";
import { sendNotification } from "@/config/socket.connection";

type Process = {
  resident_id: Schema.Types.ObjectId;
  data_name: string;
  data_category: string;
  details: string;
  link: string;
};

const ProccessNotif = async ({
  resident_id,
  data_name,
  data_category,
  details,
  link,
}: Process): Promise<{ success: boolean }> => {
  try {
    const admin = await AccountModel.findOne({ role: "admin" }).select("_id");
    const resident = await AccountModel.findOne(
      { _id: resident_id },
      { first_name: 1, last_name: 1 }
    );
    if (!admin || !resident) throw new Error("No admin and User found");
    const notifDocs = {
      user: admin._id,
      title: data_name,
      category: data_category,
      details: `${resident.first_name} ${resident.last_name} ${details}`,
      link: link,
    };
    await NotifModel.insertMany(notifDocs);
    console.log(
      "Notification saved to database, sending socket notification..."
    );
    sendNotification(io, (admin._id as string).toString(), true);
    console.log("Socket notification sent");
    return { success: true };
  } catch (error) {
    console.log("Error in processing notif", error);
    return { success: false };
  }
};

export default ProccessNotif;
