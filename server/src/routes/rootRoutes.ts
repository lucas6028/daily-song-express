import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("Hello, this is daily song server!");
  res.send("Hello, this is daily song server!");
});

export default router;
