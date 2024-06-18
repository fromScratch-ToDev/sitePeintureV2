import express from 'express';
import {router} from "./routes.js";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(cors());
app.use("/images", express.static("server/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
