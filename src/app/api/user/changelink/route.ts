import { connectDB } from '@/dbConfig/database';
import QR from '@/(backend)/dbConfig/models/qr';
import User from '@/models/user';
import  { NextResponse } from 'next/server';


connectDB();

export async function PUT(request: Request) {

    try {
        const body = await request.json();
        console.log(body);
        
        const ToUpdate = QR.findOneAndUpdate({qrlink: body.qrlink},
            {
                link:body.link,
                isSet: true
            }
        )

        if(!ToUpdate) throw new Error("QR not found");

        console.log(ToUpdate);

        return NextResponse.json({ success: true });
        
    } catch(err){

        console.log(err);
        return NextResponse.json({ success: false });
    }
    
}