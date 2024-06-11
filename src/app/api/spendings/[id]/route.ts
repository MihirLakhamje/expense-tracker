"use server";
import Spending from "@/models/Spending";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}:{params:{id:string}}) {
  try {
    const { id } = params;
    const spending = await Spending.findById(id);

    return NextResponse.json( spending , { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}