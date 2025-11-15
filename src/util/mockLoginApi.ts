import { http, HttpResponse } from "msw";
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  http.post("/login", async ({ request }) => {
    type LoginBody = { username: string; password: string };
    const { username, password } = await request.json() as LoginBody;

    debugger;
    if (username === "ambadyrkumar" && password === "Test@123") {
      return HttpResponse.json({
        id: 1,
        username,
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        gender: "other",
        image: "",
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token"
      });
    }

    return HttpResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  })
);
