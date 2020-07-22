const express = require("express");
const routes = require("./router");

const app = express();

app.use("/", routes);

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log("listening on port 3000!");
});
