module.exports = ({
  unHandledErrorMiddleware: (req: any, res: any, next: any) => {
    try {
      next();
    } catch(e) {
      return res.status(500).send("Unhandled error", e.message);
    }
  },
  checkId: (req: any, res: any, next: any) => {
    try {
      if(!req._id) throw new Error("no _id");
      next();
    } catch(e) {
      return res.status(500).send(e.message);
    }
  },
});
