import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import QR from "@/(backend)/dbConfig/models/qr";
import Product from "@/models/product";

connectDB()

export async function PUT(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const updatedFields:any = {};

        if(body.link){updatedFields.link = body.link;}
        if(body.qrlink){updatedFields.qrlink = body.qrlink;}
        if(body.productNumber){
            const product = await Product.findOne({ productNumber: body.productNumber });
            updatedFields.product = product._id;
        }
        if(body.isSet){updatedFields.isSet = body.isSet;}
        if(body.isOwned){updatedFields.isOwned = body.isOwned;}
        if(body.impressions){updatedFields.impressions = body.impressions;}
        if(body.impressionsPerDay){updatedFields.impressionsPerDay = body.impressionsPerDay;}


        
        const ToUpdate = await QR.findOneAndUpdate({ qrlink: body.qrlink },{
            $set: updatedFields
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