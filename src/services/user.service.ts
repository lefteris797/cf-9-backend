import User, {IUser} from '../models/user.model';
import Role, {IRole} from '../models/role.model';

import {Types} from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import * as userDAO from '../dao/user.dao';
import { update } from '../controller/user.controller';

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');


export const findUsers = async() =>{
    const users = await userDAO.findAll();
    return users;
}

export const findUserByEmail = async(email:string) => {
    const user = await userDAO.findByEmail(email);
    if (user) {
        return user
    }
}

export const createUser = async(payload:CreateUserDTO) => {
    if (payload.password){
        const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
        payload.password = hash;
    }

    let roleIds: Types.ObjectId[] = [];
    if (payload.roles && payload.roles.length > 0){
        roleIds = payload.roles.map(id => new Types.ObjectId(id));
    }else{
        let reader: IRole | null = await Role.findOne({role: "READER"});
        if (!reader) {
            reader = await Role.create({role: 'READER', description: "Default Role", active: true});
        } 
        roleIds = [reader._id];
    }
    // const user = new User(
    //     {
    //         // "username":payload.username,
    //         // "password":payload.password,
    //         // "email":payload.email
    //         ...payload,
    //         roles: roleIds
    //     }
    // );
    // console.log("New user(before save): ", user);
    // return user.save();

    const user = await userDAO.createUser({
        ...payload,
        roles: roleIds
    });

    return user;
}

export const updateUser = async(username:string, payload: UpdateUserDTO) => {
    const updateData: Partial<IUser> = {};
    if (payload.firstname!=undefined) updateData.firsname = payload.firstname;
    if (payload.lastname!=undefined) updateData.lastname = payload.lastname;
    if (payload.email!=undefined) updateData.email = payload.email;
    if (payload.address!=undefined) updateData.address = payload.address;
    if (payload.phone!=undefined) updateData.phone = payload.phone;

    if (payload.password!=undefined) {
        updateData.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
    }
    if (payload.roles!=undefined) {
        updateData.roles = payload.roles.map(id => new Types.ObjectId(id));
    }

    const user = await userDAO.updateUser(username, updateData);
    return user;
}