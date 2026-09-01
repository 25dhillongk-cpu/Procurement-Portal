import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Farmer from "@/models/Farmers";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const name = String(body.name || "").trim();
    const mobile = String(body.mobile || "").trim();
    const farmerId = String(body.farmerId || "").trim();
    const village = String(body.village || "").trim();
    const state = String(body.state || "").trim();
    const password = String(body.password || "");

    // Validation
    if (
      !name ||
      !mobile ||
      !farmerId ||
      !village ||
      !state ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if mobile already exists
    const existingMobile = await Farmer.findOne({ mobile });

    if (existingMobile) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this mobile number already exists",
        },
        { status: 409 }
      );
    }

    // Check if farmer ID already exists
    const existingFarmerId = await Farmer.findOne({ farmerId });

    if (existingFarmerId) {
      return NextResponse.json(
        {
          success: false,
          message: "This Farmer ID is already registered",
        },
        { status: 409 }
      );
    }

    // Create farmer
    const farmer = await Farmer.create({
      name,
      mobile,
      farmerId,
      village,
      state,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        farmer: {
          id: farmer._id.toString(),
          name: farmer.name,
          farmerId: farmer.farmerId,
          mobile: farmer.mobile,
          village: farmer.village,
          state: farmer.state,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number or Farmer ID already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during registration",
      },
      { status: 500 }
    );
  }
}