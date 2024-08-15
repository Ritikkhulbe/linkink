import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import Product from "@/models/product";

connectDB()

export async function PUT(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const ToUpdate = await Product.findOneAndUpdate({ productNumber: body.productNumber }, {
            productNumber: body.productNumber,
            name: body.name,
            size: body.size,
            images: body.images,
            variant: body.variant,
            productLink: body.productLink? body.productLink : ""
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