const { createMocks } = require("node-mocks-http");
const handler = require("./route");

describe("/api/user-settings API", () => {
  test("returns user settings on GET", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty("settings");
  });

  test("updates user settings on POST", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { theme: "dark" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ success: true });
  });
});
