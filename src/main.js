import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import cors from "cors";

web.use(cors());
console.log("aamiin");
web.listen(3000, () => {
  logger.info("berhasil");
});
