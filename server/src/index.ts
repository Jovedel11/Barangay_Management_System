import app from "@/App";
import dotenv from "dotenv";
import { ConnectDB } from "@/config/db";
dotenv.config();
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

(async () => {
  await ConnectDB();
  //download mongodb server and run it on your local machine
  //make sure to change the connection string in .env file if needed
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");
  });
})();
