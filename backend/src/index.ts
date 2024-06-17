import express from "express";
import userRoute from "./routes/user";
import accountRoute from "./routes/account"
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", accountRoute)

app.listen(3000);