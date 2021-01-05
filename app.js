const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join("public", "anhnoi-homepage", "build")));
app.use((req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "public", "anhnoi-homepage", "build", "index.html")
  );
});

app.listen(10000, () => {
  console.log(`Anhnoi-homepage running on port 10000`);
});
