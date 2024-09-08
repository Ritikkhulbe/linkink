import { connectDB } from "@/dbConfig/database";
import QR from "@/models/qr";
import { NextResponse } from "next/server";
import RedisClient from "@/dbConfig/redisConfig";


export async function POST(request: Request) {
    try{
        const body = await request.json();
        
        const qrlinkKey = `qrlink:${body.qrlink}`;
        
        const cachedLink = await RedisClient.get(qrlinkKey);
        
        if(cachedLink){
            return NextResponse.json({success: true, link: cachedLink});
        }
        
        await connectDB();
    
        const qrProduct = await QR.findOne({ qrlink: body.qrlink });

        if(!qrProduct){
            throw new Error("QR not found");
        }

        if(!qrProduct.isOwned){
            return NextResponse.json({ success: false, qrlink: body.qrlink ,link: "/auth/signin?callback=/user/addProduct" });
        }

        if(qrProduct.isSet){
            await RedisClient.set(qrlinkKey, qrProduct.link, "EX", 60 * 60 * 24 * 30);
            return NextResponse.json({ success: true, link: qrProduct.link });
        }

        return NextResponse.json({ success: false, link: "linkink.in/dashboard" });

    }catch(err){
        console.error(err);
        return NextResponse.json({ success: false, message: "Something went wrong", err });
    }
}
