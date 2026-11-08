import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "user",
      minlength: 4,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Already Exsisst"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        if (this.provider == "google") {
          return false;
        }
        return true;
      },
      minlength: 5,
      maxlength: 100,
    },
    profilePicture: String,
    coverImages: { type: [String], default: undefined },
    provider: {
      type: String,
      enum: ["system", "google"],
      default: "system",
    },
    dob: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
    type: Date,
    default: null,
    expires: 0,
  },
    towStepVerification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model("User", userSchema);
