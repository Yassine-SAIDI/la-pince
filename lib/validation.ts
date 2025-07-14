import { z } from "zod";

// Validation centralisée pour les montants
export const AmountSchema = z
  .number()
  .min(0.01, "Le montant doit être supérieur à 0")
  .max(1_000_000, "Le montant ne peut pas dépasser 1 million")
  .multipleOf(0.01, "Le montant doit avoir au maximum 2 décimales");

// Validation pour les descriptions
export const DescriptionSchema = z
  .string()
  .min(1, "La description est requise")
  .max(255, "La description ne peut pas dépasser 255 caractères")
  .regex(/^[^<>]*$/, "La description ne peut pas contenir de balises HTML");

// Validation pour les dates
export const DateSchema = z
  .date()
  .min(new Date("2000-01-01"), "La date ne peut pas être antérieure à 2000")
  .max(new Date(), "La date ne peut pas être dans le futur");

// Validation pour les IDs utilisateur
export const UserIdSchema = z
  .string()
  .min(1, "L'ID utilisateur est requis")
  .regex(/^user_[a-zA-Z0-9]{24}$/, "Format d'ID utilisateur Clerk invalide");

export type AmountType = z.infer<typeof AmountSchema>;
export type DescriptionType = z.infer<typeof DescriptionSchema>;
export type DateType = z.infer<typeof DateSchema>;
export type UserIdType = z.infer<typeof UserIdSchema>;
