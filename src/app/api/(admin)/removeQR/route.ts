import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import QR from "@/models/qr";

connectDB()

export async function DELETE(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const ToDelete = await QR.findOne({ qrlink: body.qrlink });

        if(!ToDelete){
            throw new Error("QR not found");
        }

        await QR.deleteOne({ qrlink: body.qrlink });

        return NextResponse.json({ success: true });
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}