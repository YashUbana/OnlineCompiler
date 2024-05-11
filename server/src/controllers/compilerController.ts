import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeType } from "../types/compilerTypes";
import { AuthRequest } from "../middlewares/verifyTokenAnonymous";
import { User } from "../models/User";

export const saveCode = async (req: AuthRequest, res: Response) => {
  const { fullCode, title }: { fullCode: fullCodeType; title: string } =
    req.body;

  let owerName = "Anonymous";
  let user = undefined;
  let ownerInfo = undefined;
  let isAuthenticated = false;

  if (req._id) {
    user = await User.findById(req._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    owerName = user?.username;
    ownerInfo = user?._id;
    isAuthenticated = true;
  }

  if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
    return res.status(400).send({ message: "Code cannot be blank!" });
  }
  try {
    const newCode = await Code.create({
      fullCode: fullCode,
      owerName: owerName,
      ownerInfo: ownerInfo,
      title: title,
    });
    if (isAuthenticated && user) {
      user.savedCode.push(newCode._id);
      await user.save();
    }
    // console.log(fullCode," ", ownerInfo," ", owerName);

    return res.status(201).send({ url: newCode._id, status: "saved" });
  } catch (error) {
    return res.status(500).send({ message: "Error Saving code", error });
  }
};
export const loadCode = async (req: AuthRequest, res: Response) => {
  const { urlId } = req.body;
  let isOwner = false
  const userId = req._id
  try {
    const existingCode = await Code.findById(urlId);
    if (!existingCode) {
      return res.status(404).send({ message: "Code Not Found" });
    }
    const user = await User.findById(userId)
  
    
    
    if(user?.username === existingCode.owerName){
      isOwner = true
    }
    return res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
  } catch (error) {
    return res.status(500).send({ message: "Error Loading code", error });
  }
};

export const getMyCodes = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId).populate({
      path: "savedCode",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) {
      return res.status(500).send({ message: "Cannot find user" });
    }
    return res.status(200).send(user.savedCode);
  } catch (error) {
    return res.status(500).send({ message: "Error loading code", error });
  }
};

export const deleteCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const { id } = req.params;
  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).send({ message: "Cannot find the owner profile" });
    }
    const existingCode = await Code.findById(id);
    if (!existingCode) {
      return res.status(404).send({ message: "Code Not Found" });
    }

    if (existingCode.owerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You dont have the permission to DELETE!" });
    }
    const deleteCode = await Code.findByIdAndDelete(id);
    if (deleteCode) {
      return res.status(200).send({ message: "Code Deleted Successfully!" });
    } else {
      return res.status(200).send({ message: "Code Not found" });
    }

    return res.status(200).send({ id });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting code", error });
  }
};

export const editCode = async (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).send({ message: "Error Editing code", error });
  }
};
