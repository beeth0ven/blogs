import cors from "cors";
import {ORIGIN} from "../config";

const whitelist = [ORIGIN, "http://beeth0ven.cf.s3-website.ap-northeast-2.amazonaws.com", "https://beeth0ven.cf"];

const corsService = cors((req, callback) => {
  const allowed = whitelist.indexOf(req.header('Origin')) !== -1;
  callback(null, {
    origin: allowed,
    optionsSuccessStatus: 200,
    credentials: true
  });
});

export default corsService;