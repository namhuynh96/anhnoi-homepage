const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join("anhnoi-homepage-public", "build")));
app.use((req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "anhnoi-homepage-public", "build", "index.html")
  );
});

app.listen(10000, () => {
  console.log(`Anhnoi-homepage running on port 10000`);
});
