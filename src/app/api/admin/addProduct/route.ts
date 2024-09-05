import { connectDB } from "@/(backend)/dbConfig/database";
import Product from "@/(backend)/models/product";
import { NextResponse } from "next/server";

connectDB()

export async function POST(request: Request) {
    try{
        const body = await request.json();
        console.log(body);

        const newProduct = new Product({
            productNumber: body.productNumber,
            name: body.name,
            sizes: body.sizes,
            images: body.images,
            colours: body.colours,
            productLink: body.productLink? body.productLink : ""
        });

        await newProduct.save();

        return NextResponse.json({ success: true });
    }catch(err){
        console.log(err);
        return NextResponse.json({ success: false });
    }
}