import mongoose, { Mongoose } from "mongoose";

interface ICodeSchema {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  title: string;
  ownerInfo: mongoose.Types.ObjectId | string;
  owerName: string;
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
  title: { type: String, required: true },
  ownerInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owerName: String,
},{timestamps:true});

export const Code = mongoose.model("Code", CodeSchema);
