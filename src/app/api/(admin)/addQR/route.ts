import { connectDB } from "@/dbConfig/database";
import QR from "@/models/qr";
import { NextResponse } from "next/server";

connectDB()

export async function POST(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const newQR = new QR({
            qrlink: body.qrlink,
            link: body.link ? body.link : "https://linkink.in",
            product: body.product,
        });

        await newQR.save();

        return NextResponse.json({ success: true });
        
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}