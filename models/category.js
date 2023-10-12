const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../helpers");

const categorySchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const Category = model("categories", categorySchema);

module.exports = {
  Category,
};
