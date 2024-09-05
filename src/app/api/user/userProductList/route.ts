import { NextResponse } from "next/server";
import { connectDB } from "@/(backend)/dbConfig/database";
import User from "@/(backend)/models/user";

connectDB();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);

        const user = await User.findOne({ email: body.email });

        if (!user) throw new Error("User not found");

        const productList = user.productList;
        
        return NextResponse.json({ success: true, productList });

    }catch (err) {
        console.log(err);
        return NextResponse.json({ success: false });
    }
}