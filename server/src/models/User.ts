import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  password: string;
  email: string;
  picture: string;
  savedCode: Array<mongoose.Types.ObjectId>;
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    },
    savedCode: [{ type: mongoose.Schema.Types.ObjectId , ref:"Code"}],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
