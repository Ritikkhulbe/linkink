import { Schema, models,  model } from "mongoose";
import { qr } from "./qr";

enum userRole {
    USER = "user",
    ADMIN = "admin",
}

export interface user{
    email: string,
    name: string,
    image: string,
    role: userRole,
    productList: qr[],
}

const UserSchema = new Schema<user>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    image: {
        type: String,
    },
    productList: {
        type: [{type: Schema.Types.ObjectId, ref: "qrs", unique: true}],
        required: false,
    },
    role: {
        type: String,
        enum: [userRole.USER, userRole.ADMIN],
        default: userRole.USER,
    }
}, {timestamps: true});

const User = models.users || model<user>("users", UserSchema);

export default User;