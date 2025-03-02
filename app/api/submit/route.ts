import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  framework: z.string().min(1, "Selecione um framework"),
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone não pode ter mais de 15 dígitos")
    .or(z.literal(""))
    .optional(),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1500, "Descrição não pode ter mais de 1500 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      console.error("Erro de validação:", validatedData.error.format());
      return NextResponse.json(
        { message: "Erro de validação", errors: validatedData.error.format() },
        { status: 400 },
      );
    }

    const { framework, name, email, phone, description } = validatedData.data;

    const userData = {
      framework,
      name,
      email,
      phone: phone === "" ? null : phone,
      description,
    };

    const user = await prisma.user.create({
      data: userData,
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
