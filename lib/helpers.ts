// import { getCurrencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export function GetFormatterForCurrency(currency: string) {
  try {
    // Vérifions si la devise est valide avant de créer le formateur
    // pour pouvoir capturer l'erreur dans le bloc try/catch
    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error(`Invalid currency format: ${currency}`);
    }

    // On n'a pas besoin des données de l'API pour le formateur
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
    });
  } catch (error) {
    console.error("Error creating formatter:", error);
    // Fallback au cas où
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  }
}
