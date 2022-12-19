import { model, Schema } from "mongoose";

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toObject: {
      transform: function (_, ret) {
        ret.uid = ret._id;
        delete ret._id;
      },
    },
  }
);

ProductSchema.methods.toJSON = function () {
  const { __v, _id: uid, ...product } = this.toObject();
  return {
    uid,
    ...product,
  };
};

export default model("Product", ProductSchema);
