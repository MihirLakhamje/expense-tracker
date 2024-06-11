"use server";
import dbConfig from "@/libs/dbConfig";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    await dbConfig();
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if(!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        
        const hashedPassword = await bcryptjs.hash(password, 12);

        const user = new User({ name, email, password: hashedPassword});
        await user.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });        
    }

}