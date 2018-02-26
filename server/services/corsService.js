import cors from "cors";
import {WEB_BASE_URL} from "../config";

const corsService = cors({
  origin: WEB_BASE_URL,
  optionsSuccessStatus: 200,
  credentials: true
});

export default corsService;