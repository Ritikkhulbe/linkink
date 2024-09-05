import { connectDB } from "@/(backend)/dbConfig/database";
import QR from "@/(backend)/models/qr";
import { NextResponse } from "next/server";
import { isSet } from "util/types";

connectDB();

export async function POST(request: Request) {
    try{
    const body = await request.json();

    
    
    const qrProduct = await QR.findOne({ qrlink: body.qrlink });

    if(!qrProduct){
        throw new Error("QR not found");
    }

    if(!qrProduct.isOwned){
        return NextResponse.json({ success: false, qrlink: body.qrlink ,link: "/auth/signin?callback=/user/addProduct" });
    }

    if(qrProduct.isSet){
        return NextResponse.json({ success: true, link: qrProduct.link });
    }

    return NextResponse.json({ success: false, qrlink: "/dashboard" });

}catch(err){
    console.error(err);
}
}
