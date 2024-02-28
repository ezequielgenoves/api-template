import { Router } from "express";
import fs from "fs";
const router = Router();
const pathRouter = `${__dirname}`;

const removeExtension = (file) => file.split(".").shift();

const ApiRouter = (filesNotRouted: string[] = ["router"]) => {
  fs.readdirSync(pathRouter).filter((file) => {
    const fileWithoutExtension = removeExtension(file);
    const skip = filesNotRouted.includes(fileWithoutExtension);
    if (!skip) {
      router.use(
        `/${fileWithoutExtension}`,
        require(`./${fileWithoutExtension}.router`)
      );
    }
  });

  router.get("*", (_req, res) => {
    res.sendStatus(404);
  });

  return router;
};

export default ApiRouter;
