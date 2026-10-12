import { z } from "zod";

/**
 * Schema compartilhado entre o formulário (client) e a API route (server).
 * A validação client oferece feedback imediato; a validação server é a
 * que efetivamente protege o endpoint contra dados inválidos ou maliciosos.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido com DDD.")
    .max(11, "Informe um WhatsApp válido com DDD.")
    .regex(/^\d+$/, "Utilize apenas números."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
  city: z
    .string()
    .trim()
    .min(2, "Informe sua cidade.")
    .max(100, "Nome de cidade muito longo."),
  practiceArea: z.string().trim().min(1, "Selecione uma área de interesse."),
  message: z
    .string()
    .trim()
    .min(10, "Descreva brevemente sua situação (mínimo 10 caracteres).")
    .max(2000, "Mensagem muito longa."),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      error: "É necessário autorizar o contato para enviar o formulário.",
    }),
  website: z.string().max(0, "Campo inválido.").optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
