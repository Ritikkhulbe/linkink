import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import Product from "@/models/product";

connectDB()

export async function PUT(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const updateFields: any = {};

        if (body.name) updateFields.name = body.name;
        if (body.sizes) updateFields.sizes = body.sizes;
        if (body.images) updateFields.images = body.images;
        if (body.colours) updateFields.colours = body.colours;
        if (body.productLink !== undefined) updateFields.productLink = body.productLink; 

        const ToUpdate = await Product.findOneAndUpdate({ productNumber: body.productNumber }, {
            $set: updateFields
        });

        if(!ToUpdate){
            throw new Error("Product not found and not updated");
        }
        
        return NextResponse.json({ success: true });

    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}