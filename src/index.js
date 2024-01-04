import express from "express";

import testsRouter from "./tests.router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/tests", testsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
