import { Schema, model } from "mongoose";

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is required."],
  },
});

export default model("Role", roleSchema);
