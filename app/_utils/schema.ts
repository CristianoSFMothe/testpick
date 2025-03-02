// app/_utils/schema.ts
import { z } from "zod";

export const formSchema = z.object({
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
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(1500, "A descrição não pode ter mais de 1500 caracteres"),
});

export type FormData = z.infer<typeof formSchema>;
