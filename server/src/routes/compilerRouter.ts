import express from "express";
import { deleteCode, editCode, loadCode, saveCode } from "../controllers/compilerController" 
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous";
import { verifyToken } from "../middlewares/verifyToken";

export const compilerRouter = express.Router()

compilerRouter.post("/save",verifyTokenAnonymous,saveCode)
compilerRouter.delete("/delete/:id",verifyToken, deleteCode)
compilerRouter.post("/load",verifyTokenAnonymous,loadCode )
compilerRouter.put("/edit",verifyToken, editCode )