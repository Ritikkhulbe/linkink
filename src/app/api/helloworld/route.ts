import { connectDB } from "@/dbConfig/database";
import { NextResponse } from "next/server";

connectDB();



export async function GET() {
    
    const array = [{hello: "world"}];
    
    return NextResponse.json(array);
}