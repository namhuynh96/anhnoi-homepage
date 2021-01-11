const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Partner = require("./models/partner");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("anhnoi-homepage-public", "build")));

if (process.env.NODE_ENV === "development") {
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
  });
}

app.get("/ref/:refId", async (req, res) => {
  try {
    res.redirect(
      `https://apps.haravan.com/products/anhnoi-photo-review-danh-gia-bang-hinh-anh?ref=${req.params.refId}`
    );
    const partner = await Partner.findOne({ refId: req.params.refId });
    if (partner) {
      partner.clicks++;
      partner.save();
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/partner", async (req, res) => {
  try {
    let refId;
    let partner;
    do {
      refId = nanoid(5);
      partner = await Partner.findOne({ refId }).lean();
    } while (!!partner);

    const newPartner = new Partner({
      name: req.body.name,
      email: req.body.email,
      businessType: req.body.businessType,
      platform: "haravan",
      refId,
    });
    await newPartner.save();
    res.status(201).json({ refUrl: `https://anhnoi.com/ref/${refId}` });
  } catch (error) {
    res.status(500).json({});
  }
});

app.use((req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "anhnoi-homepage-public", "build", "index.html")
  );
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zpnum.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(async () => {
    const port = 10000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
