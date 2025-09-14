import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validate incoming payload
const RegisterSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.email("Invalid email address").trim().toLowerCase().max(120),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = RegisterSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // Check for existing user by unique email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // Hash password using bcryptjs
    const saltRounds = 12; // reasonable default
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true }, // return safe fields only
    });

    return NextResponse.json(
      { user, message: "Registration successful" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // avoid caching issues for POST
