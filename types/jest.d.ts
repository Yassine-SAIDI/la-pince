import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      // Ajoutez les types spécifiques au projet si nécessaire
    }
  }
}
