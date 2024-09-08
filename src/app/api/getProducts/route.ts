import { connectDB } from "@/dbConfig/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request: Request) {
    try {
        const Products = await Product.find({});

        console.log(Products)

        return NextResponse.json({ success: true, Products })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false });
    }
}