import { Schema, model, Document, Types } from "mongoose";

interface IPhone {type:string, number:string}

export interface IUser extends Document {
    username: string;
    password: string;
    firsname?: string;
    lastname?: string;
    email?: string;
    address?:{
        area?:string;
        street?:string;
        number?:string;
        po?:string;
        municipality?:string;
    }
    phone?:IPhone[];
    roles:Types.ObjectId[];
}

const PhoneSchema = new Schema<IPhone>({
    type: String,
    number: String
})

const UserSchema = new Schema({
    username:  {type:String, required:true, unique:true },
    password:  {type:String, required:true, unique:true },
    firstname: String,
    lastname: String,
    email: {type:String, unique:true},
    adress: {
        area: String,
        street: String,
        number: String,
        po: String,
        municipality: String
    },
    phone: [PhoneSchema],
    roles: [{
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
    }]
},
{
    collection: 'users',
    timestamps: true
});

export default model<IUser>("User", UserSchema)