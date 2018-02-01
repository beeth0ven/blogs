import cors from "cors";
import {ORIGIN} from "../config";

const corsService = cors({
  origin: ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true
});

export default corsService;