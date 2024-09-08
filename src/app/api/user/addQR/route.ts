import { connectDB } from '@/dbConfig/database';
import QR from '@/(backend)/dbConfig/models/qr';
import User from '@/models/user';
import  { NextResponse } from 'next/server';


connectDB();

export async function PUT(request: Request) {

    try {
        const body = await request.json();
        console.log(body);
        
        const QRToBeAdded = await QR.findOne({qrlink: body.qrlink});
        
        if (!QRToBeAdded) throw new Error("QR not found");
        if (QRToBeAdded.isOwned) throw new Error("QR already owned");

        const CurrUser = await User.findOne({email : body.email});

        if(!CurrUser) throw new Error("User not found");

        console.log(CurrUser);

        await User.updateOne(
            { email: body.email },
            { $push: { productList: QRToBeAdded } }
        );

        await QR.updateOne({qrlink: body.qrlink},
            {isOwned: true}
        )

        return NextResponse.json({ success: true });
        
    } catch(err){

        console.log(err);
        return NextResponse.json({ success: false });
    }
    
}