import { getSession } from "@/libs/auth";
import Spending from "@/models/Spending";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}:{params:{id:string}}) {
  try {
    const { id } = params;
    const session = await getSession();

    const body = await request.json();
    const { newData } = body;
    const spending = await Spending.findOneAndUpdate({$and: [{ _id: id }, { owner: session?._id }]}, newData, { new: true });

    await spending?.save();

    const newSpending = await Spending.findById(id);

    return NextResponse.json( newSpending , { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}