import { Schema, model } from "mongoose";

type Notif = {
  user: Schema.Types.ObjectId;
  title: string;
  category: string;
  link: string;
  isSeen: string;
};

const notifSchema = new Schema<Notif>({
  user: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  link: { type: String, required: true },
  /*details: { type: String, required: true }*/
  isSeen: { type: String, required: false },
});

const NotifModel = model<Notif>("Notification", notifSchema);

export default NotifModel;
