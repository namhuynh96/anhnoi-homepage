const { Schema, model } = require("mongoose");

const partnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  refId: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  installs: {
    type: Number,
    default: 0,
  },
});

const Partner = model("Partner", partnerSchema);

module.exports = Partner;
