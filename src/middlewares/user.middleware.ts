import { Request, Response, NextFunction } from 'express';
import {IRole} from '../models/role.model';

export const hasReaderRole = async(req:Request, res:Response, next: NextFunction) => {
  try{
    console.log("REQ USER>>>>", req.user);
    const checkReaderRole = req.user.roles.some((r:IRole) => r.role==="READER" && r.active);
    if (!checkReaderRole){
        return res.status(403).json({message: "Forbidden: No Reader Role"});
    }
    next();    
  } catch (err) {
    res.status(401).json({message: "Invalid or expired token"})
  }
}