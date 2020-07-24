const express = require("express");
const routes = require("./router");

const app = express();

app.use(require("body-parser").json());
app.use("/", routes);

app.listen(process.env.PORT || 8000, () => {
  // eslint-disable-next-line no-console
  console.log("listening on port " + (process.env.PORT || 8000));
});
