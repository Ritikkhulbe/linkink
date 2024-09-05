import { connectDB } from "@/(backend)/dbConfig/database";
import Product from "@/(backend)/models/product";
import QR from "@/(backend)/dbConfig/models/qr";
import { NextResponse } from "next/server";

connectDB()

export async function POST(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const product = await Product.findOne({ productNumber: body.productNumber });

        const newQR = new QR({
            qrlink: body.qrlink,
            link: body.link ? body.link : "",
            product: product._id,
        });

        await newQR.save();

        return NextResponse.json({ success: true });
        
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}