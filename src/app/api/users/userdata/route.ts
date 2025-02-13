import User from "@/app/models/userModel";
import { connect } from "@/app/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";

await connect();
export async function GET(request: NextRequest) {
  try {
    const users = await User.find({});
    return NextResponse.json(
      {
        success: true,
        message: "user all getting successfully!",
        users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
