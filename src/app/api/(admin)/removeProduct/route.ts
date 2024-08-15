import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/database";
import Product from "@/models/product";

connectDB()

export async function DELETE(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const ToDelete = await Product.findOne({ productNumber: body.productNumber });

        if(!ToDelete){
            throw new Error("Product not found");
        }

        await Product.deleteOne({ productNumber: body.productNumber });

        return NextResponse.json({ success: true });
        
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}
