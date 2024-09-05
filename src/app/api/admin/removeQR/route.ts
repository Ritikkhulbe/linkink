import { NextResponse } from "next/server";
import { connectDB } from "@/(backend)/dbConfig/database";
import QR from "@/(backend)/dbConfig/models/qr";

connectDB()

export async function DELETE(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const ToDelete = await QR.findOneAndDelete({ qrlink: body.qrlink });

        if(!ToDelete){
            throw new Error("QR not found");
        }

        return NextResponse.json({ success: true });
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}