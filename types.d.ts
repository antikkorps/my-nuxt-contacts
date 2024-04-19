import { Avatar } from "./.nuxt/components.d";
declare module "@auth/core/types" {
  interface Session {
    user?: User;
  }
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
  }
}

export {};
