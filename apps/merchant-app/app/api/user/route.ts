import { NextResponse } from "next/server";
import db from "@repo/db/client";

export const GET = async () => {
    try {
        const existingUser = await db.user.findUnique({
            where: { email: "asd" }
        });

        if (existingUser) {
            return NextResponse.json({
                error: "User with this email already exists"
            }, { status: 400 });
        }

        await db.user.create({
            data: {
                email: "asd",
                name: "adsads",
                number: "1234567890",
                password: "password123"
            }
        });

        return NextResponse.json({
            message: "User created successfully"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            error: "Failed to create user"
        }, { status: 500 });
    }
};