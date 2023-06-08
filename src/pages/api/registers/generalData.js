// Dependencies
import connectMongo from "database/conn";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
// Controllers
import { getGeneralData } from "controllers/Registers";

const router = createRouter();
connectMongo();

router
  .use(expressWrapper(cors()))
  .get(getGeneralData)

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "300mb",
    },
  },
};
