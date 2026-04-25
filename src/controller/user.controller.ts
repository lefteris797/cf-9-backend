import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { UpdateUserDTO } from '../dto/user.dto';

export const getAll = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findUsers();
    res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

export const getOneByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
      // const email:string = req.params.email;
    const emailParam = req.params.email;

    if (typeof emailParam !=="string") {
        return res.status(400).json({ message: "Invalid email parameter" });
    }

    const email:string = emailParam;
    
    const result = await userService.findUserByEmail(email);
    if (!result)
      return res.status(404).json({message: 'User not found by email'});
    res.status(200).json(result);
  } catch (err) {
    next (err)
  }
}

export const create = async(req:Request, res:Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({status:true, data:user});
  } catch(err) {
    console.log(err);
    next(err)
  }
}

export const update = async(req: Request, res: Response, next: NextFunction) => {
  try{
     // const username: string =  req.params.username;
    
    const usernameParam = req.params.username;

    if (typeof usernameParam !== "string") {
      return res.status(400).json({ message: "Invalid username parameter" });
    }

    const username: string = usernameParam;
    
    const data: UpdateUserDTO = req.body;
    const result = await userService.updateUser(username, data);
    if (!result)
      return res.status(401).json({message: "User not found"})
    res.status(200).json(result);
  } catch (err) {
    next(err)
  } 

}