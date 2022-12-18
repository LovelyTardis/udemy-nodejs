import { model, Schema } from "mongoose";

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Category", CategorySchema);
