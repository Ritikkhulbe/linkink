import { connectDB } from "@/dbConfig/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request: Request){
    try {

        const body = await request.json();

        const userDetails = await User.findOne({email: body.email});

        if(!userDetails) throw new Error("User not found");

        return NextResponse.json({success: true, userDetails});
    }catch(err){
        console.log(err);
        return NextResponse.json({success: false});
    }
}