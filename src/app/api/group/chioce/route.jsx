import connectDB from "../../../utils/database";
import { GroupModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const groups = await GroupModel.find({});
  try {
    return NextResponse.json({
      message: "アクセス成功",
      groups,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "アクセスできませんでした",
      status: 500,
    });
  }
}
