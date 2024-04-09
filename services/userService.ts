import type { UserRegistration, User } from "../server/utils/types";

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

export const modifyUser = async (user: User) => {
  try {
    const response = await fetch("/api/v1/modify-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.ok;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
