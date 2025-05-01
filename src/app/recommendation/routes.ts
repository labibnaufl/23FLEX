import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, type, description, adminId } = body;

  try {
    await prisma.recommendation.create({
      data: {
        title,
        type,
        description,
        adminId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan rekomendasi" }, { status: 500 });
  }
}
