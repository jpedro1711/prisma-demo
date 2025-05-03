import { UserRole } from "@prisma/client";
import { z } from "zod";

export const RegistrationSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  fullname: z.string().min(1, "Nome completo é obrigatório"),
  userRole: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Tipo de usuário inválido" }),
  }),
});
