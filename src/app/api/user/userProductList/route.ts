// src/app/api/users/qrs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import QR, { qr } from "@/models/qr";
import Product from "@/models/product";
import { connectDB } from "@/dbConfig/database";
import authOptions from "../../auth/[...nextauth]/options";
import User from "@/models/user";

connectDB();

export async function GET(req: NextRequest) {
    try {
        
        // Get the session
        const session = await getServerSession(authOptions);

        // Check if session exists
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Get the email from the session
        const email = session.user.email;

        // Find the user by email
        const user = await User.findOne({ email }).populate({
            path: "productList",
            model: QR,
            populate: {
                path: "product",
                model: Product,
                select: "name images productLink"
            },
            select: "qrlink link product createdAt"
        });

        // If the user is not found, return an error response
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Extract owned QR codes with product details
        const qrs = user.productList.map((qr:any) => ({
            qrlink: qr.qrlink,
            link: qr.link,
            productName: qr.product.name,
            productImages: qr.product.images,
            productLink: qr.product.productLink,
            createdAt: qr.createdAt
        }));

        // Return the QR details as a JSON response
        return NextResponse.json(qrs);
    } catch (error) {
        console.error("Error fetching user QR codes:", error);
        return NextResponse.json({ error: "Failed to fetch user QR codes" }, { status: 500 });
    }
}
