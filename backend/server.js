const express = require("express");
const app = express();
const PORT = 8080;

// TEST
app.get("/", (req, res) => {
  const msg = "Fantasy-sport-app backend";
  console.log(msg);
  res.status(200).send(msg);
});

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
