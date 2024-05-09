import connectDB from "../../../utils/database";
import { GroupModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { groupname } = body;
    console.log("groupname:", groupname);
    // グループ名のバリデーション
    if (!groupname || groupname.trim().length === 0) {
      return NextResponse.json({
        message: "グループ名は必須です。",
        status: 400,
      });
    }

    const existingGroup = await GroupModel.findOne({ groupname: groupname });

    // グループ名が重複していないことを確認
    if (existingGroup) {
      return NextResponse.json({
        message: "同じグループ名は、作成できません。",
        status: 400,
      });
    }

    const newGroup = new GroupModel({ groupname: groupname });
    await newGroup.save();

    return NextResponse.json({
      message: "グループ作成成功",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "アクセスできませんでした",
      status: 500,
    });
  }
}
