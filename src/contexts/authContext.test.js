import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "./authContext";
import { loginUser, createApiKey } from "../api/auth";
import { getProfileByName } from "../api/profiles";
import Cookies from "js-cookie";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../api/auth");
jest.mock("../api/profiles");
jest.mock("js-cookie");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      args[0].includes("Warning: `ReactDOMTestUtils.act` is deprecated") ||
      (args[0].includes("Error during login: Error: Login failed") &&
        args[1]?.message === "Login failed")
    ) {
      return;
    }
    console.error.call(console, ...args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

/**
 * Mock component to use AuthContext.
 * @component
 * @returns {React.Element}
 */
const MockComponent = () => {
  const { authData, handleLogin, handleLogout } = useAuth();
  return (
    <div>
      <button onClick={() => handleLogin("test@example.com", "password")}>
        Login
      </button>
      <button onClick={handleLogout}>Logout</button>
      <div>{authData.isLoading && "Loading..."}</div>
      <div>{authData.error && `Error: ${authData.error}`}</div>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    Cookies.get.mockImplementation((key) => {
      if (key === "accessToken") return null;
      if (key === "apiKey") return null;
      if (key === "username") return null;
      return null;
    });
    Cookies.set.mockImplementation(() => {});
    Cookies.remove.mockImplementation(() => {});
  });

  /**
   * Test for successful login.
   * @returns {Promise<void>}
   */
  it("should handle successful login", async () => {
    loginUser.mockResolvedValue({ accessToken: "fakeToken", name: "testuser" });
    createApiKey.mockResolvedValue("fakeApiKey");
    getProfileByName.mockResolvedValue({ data: { bio: "test bio" } });

    await act(async () => {
      render(
        <Router>
          <AuthProvider>
            <MockComponent />
          </AuthProvider>
        </Router>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByText("Login"));
    });

    await waitFor(() =>
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password"
      })
    );
    await waitFor(() => expect(createApiKey).toHaveBeenCalledWith("fakeToken"));
    await waitFor(() =>
      expect(getProfileByName).toHaveBeenCalledWith(
        "testuser",
        "fakeToken",
        "fakeApiKey"
      )
    );

    expect(Cookies.set).toHaveBeenCalledWith("accessToken", "fakeToken", {
      expires: 7,
      secure: true
    });
    expect(Cookies.set).toHaveBeenCalledWith("username", "testuser", {
      expires: 7,
      secure: true
    });
    expect(Cookies.set).toHaveBeenCalledWith("apiKey", "fakeApiKey", {
      expires: 7,
      secure: true
    });
  });

  /**
   * Test for logout functionality.
   * @returns {Promise<void>}
   */
  it("should handle logout", async () => {
    await act(async () => {
      render(
        <Router>
          <AuthProvider>
            <MockComponent />
          </AuthProvider>
        </Router>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByText("Logout"));
    });

    expect(Cookies.remove).toHaveBeenCalledWith("accessToken");
    expect(Cookies.remove).toHaveBeenCalledWith("apiKey");
    expect(Cookies.remove).toHaveBeenCalledWith("username");
  });

  /**
   * Test for login error handling.
   * @returns {Promise<void>}
   */
  it("should handle login error", async () => {
    loginUser.mockRejectedValue(new Error("Login failed"));

    await act(async () => {
      render(
        <Router>
          <AuthProvider>
            <MockComponent />
          </AuthProvider>
        </Router>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByText("Login"));
    });

    await waitFor(() =>
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password"
      })
    );
    await waitFor(() =>
      expect(screen.getByText("Error: Login failed")).toBeInTheDocument()
    );
  });
});
