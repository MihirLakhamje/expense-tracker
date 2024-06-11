"use server";
import { getSession } from "@/libs/auth";
import dbConfig from "@/libs/dbConfig";
import Spending from "@/models/Spending";
import User from "@/models/User";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  await dbConfig();
  try {
    const session = await getSession();
    const spendings = await Spending.find({ owner: session?._id });
    const totalAmount = spendings.reduce((acc, curr) => acc + curr.amount, 0);

    return NextResponse.json({spendings, totalAmount}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}