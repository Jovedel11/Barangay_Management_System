import app from "@/App";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
