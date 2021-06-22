import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

module.exports = ({
  unHandledErrorMiddleware: (req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch(e) {
      return res.status(500).send(`Unhandled error ${e.message}`, );
    }
  },
  checkId: (req: Request, res: Response, next: NextFunction) => {
    try {
      if(! get(req, "_id")) throw new Error("no _id");
      next();
    } catch(e) {
      return res.status(500).send(e.message);
    }
  },
});
