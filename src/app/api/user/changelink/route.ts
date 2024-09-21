import { connectDB } from '@/dbConfig/database';
import QR from '@/models/qr';
import  { NextResponse } from 'next/server';
import RedisClient from "@/dbConfig/redisConfig";

connectDB();

export async function PUT(request: Request) {

    try {
        const body = await request.json();
        console.log(body);
        
        const ToUpdate = QR.findOneAndUpdate({qrlink: body.qrlink},
            {
                link:body.link,
                isSet: true
            },
            {
                new: true,
            }
        )

        if(!ToUpdate) throw new Error("QR not found");

        const qrlinkKey = `qrlink:${body.qrlink}`;
        await RedisClient.set(qrlinkKey, body.link, "EX", 60 * 60 * 24 * 30);

        console.log(ToUpdate);

        return NextResponse.json({ success: true });
        
    } catch(err){

        console.log(err);
        return NextResponse.json({ success: false });
    }
    
}