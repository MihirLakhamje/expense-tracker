"use server";
import { getSession } from "@/libs/auth";
import dbConfig from "@/libs/dbConfig";
import Spending from "@/models/Spending";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  await dbConfig();
  try {
    const session = await getSession();
    const body = await request.json();
    const { title, amount, category } = body;
    if (!title || !amount) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const spending = new Spending({ title, amount, category, owner: session?._id });
    await spending.save();

    return NextResponse.json({ message: "Spending added successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}