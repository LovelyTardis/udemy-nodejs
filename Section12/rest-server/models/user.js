import { Schema, model } from "mongoose";

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      default: "USER_ROLE",
    },
    state: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
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

UserSchema.methods.toJSON = function () {
  const { __v, password, _id: uid, ...user } = this.toObject();
  return {
    uid,
    ...user,
  };
};

export default model("User", UserSchema);
