import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { formSchema } from "@/app/_utils/schema";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.safeParse(body);

    if (!validatedData.success) {
      console.error("Erro de validação:", validatedData.error.format());
      return NextResponse.json(
        { message: "Erro de validação", errors: validatedData.error.format() },
        { status: 400 },
      );
    }

    const { framework, name, email, phone, description } = validatedData.data;

    const user = await prisma.user.create({
      data: {
        framework,
        name,
        email,
        phone: phone === "" ? null : phone,
        description,
      },
    });

    return NextResponse.json({
      message: "Usuário cadastrado com sucesso",
      user,
    });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { message: "Erro ao processar requisição" },
      { status: 500 },
    );
  }
}
