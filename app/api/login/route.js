import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Farmer from "@/models/Farmers";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const mobile = String(body.mobile || "").trim();
    const password = String(body.password || "");

    if (!mobile || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number and password are required",
        },
        { status: 400 }
      );
    }

    // Find farmer using mobile number
    const farmer = await Farmer.findOne({ mobile });

    if (!farmer) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this mobile number",
        },
        { status: 401 }
      );
    }

    // Compare password
    if (String(farmer.password) !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      farmer: {
        id: farmer._id.toString(),
        name: farmer.name,
        farmerId: farmer.farmerId,
        mobile: farmer.mobile,
        village: farmer.village,
        state: farmer.state || "",
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during login",
      },
      { status: 500 }
    );
  }
}