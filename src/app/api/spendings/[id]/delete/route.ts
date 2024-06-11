"use server";
import Spending from "@/models/Spending";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}:{params:{id:string}}) {
  try {
    const { id } = params;
    await Spending.findByIdAndDelete(id);


    return NextResponse.json( "deleted" , { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}