const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../helpers");

const productsSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      image: String,
    },
    images: [String],
  },
  { versionKey: false, timestamps: true }
);

productsSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const Products = model("products", productsSchema);

module.exports = {
  Products,
};
