import type { UserRegistration } from "../server/utils/types";

export const register = async (email: string, password: string) => {
  const user: UserRegistration = { email, password };
  const response = await fetch("/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.ok;
};
