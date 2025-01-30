// import { getCurrencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
        )
  );
}

export function GetFormatterForCurrency(currency: string) {
  try {
    // On n'a pas besoin des données de l'API pour le formateur
    return new Intl.NumberFormat(undefined, {
      style: "currency",  
      currency: currency
    });
  } catch (error) {
    console.error("Error creating formatter:", error);
    // Fallback au cas où
    return new Intl.NumberFormat('EUR', {
      style: "currency",
      currency: currency
    });
  }
}