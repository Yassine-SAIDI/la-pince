import { createMocks } from "node-mocks-http";
import { describe, expect, test } from "@jest/globals";

// Cette fonction simule un middleware d'authentification
// à tester en isolation (à adapter selon votre implémentation)
function mockAuthMiddleware(handler: any) {
  return async (req: any, res: any) => {
    // Vérification simplifiée d'authentification
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token || token !== "valid-token") {
      return res.status(401).json({ error: "Non autorisé" });
    }
    return handler(req, res);
  };
}

// Contrôleur protégé fictif
const protectedHandler = (req: any, res: any) => {
  return res.status(200).json({ data: "Données protégées" });
};

describe("Tests de sécurité - Authentification", () => {
  test("devrait bloquer les accès non authentifiés", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {
        // Pas de token d'authentification
      },
    });

    const protectedRoute = mockAuthMiddleware(protectedHandler);
    await protectedRoute(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ error: "Non autorisé" });
  });

  test("devrait autoriser les accès authentifiés", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {
        authorization: "Bearer valid-token",
      },
    });

    const protectedRoute = mockAuthMiddleware(protectedHandler);
    await protectedRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ data: "Données protégées" });
  });
});
