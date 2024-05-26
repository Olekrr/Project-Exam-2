import { apiRequest } from "./common";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("apiRequest", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify({ message: "Success" }))
      })
    );
  });

  /**
   * Test the success response of apiRequest.
   * @returns {Promise<void>}
   */
  it("should return parsed JSON on success", async () => {
    const response = await apiRequest("/test-endpoint", "GET");
    expect(response).toEqual({ message: "Success" });
  });

  /**
   * Test the handling of a 401 error response from apiRequest.
   * @returns {Promise<void>}
   */
  it("should handle 401 error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        text: () => Promise.resolve('{"errors":[{"message":"Error"}]}')
      })
    );
    await expect(apiRequest("/test-endpoint", "GET")).rejects.toThrow(
      'API request failed with status: 401 - {"errors":[{"message":"Error"}]}'
    );
  });

  /**
   * Test the handling of JSON parsing errors in apiRequest.
   * @returns {Promise<void>}
   */
  it("should handle JSON parsing error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve("invalid JSON")
      })
    );
    await expect(apiRequest("/test-endpoint", "GET")).rejects.toThrow(
      "Unexpected token i in JSON at position 0"
    );
  });
});
