import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import QR from "@/models/qr";

connectDB()

export async function PUT(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const ToUpdate = await QR.findOneAndUpdate({ qrlink: body.qrlink },{
            qrlink: body.qrlink,
            link: body.link,
            isSet: body.isSet,
            isOwned: body.isOwned,
            product: body.product,
        });

        if(!ToUpdate){
            throw new Error("QR not found and not updated");
        }

        return NextResponse.json({ success: true });
        
    } catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}