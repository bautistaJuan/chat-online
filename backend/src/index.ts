import express from "express";
import { corsMidleware } from "./midleware";
import { json } from "body-parser";
import { chatRouter } from "./routes/routes";

const app = express();
app.use(corsMidleware());
app.use(json());
app.disable("x-powered-by");

const PORT = process.env.PORT || 8080;

app.use("/", chatRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
