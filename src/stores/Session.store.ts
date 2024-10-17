import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface userData {
  name: string;
  email: string;
}

interface SessionState {
  session: "Logged In" | "Logged Out";
  userData: userData | null;
  Login: (userNewData: userData) => void;
  Logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: "Logged Out",
      userData: null,
      Login: (userNewData) =>
        set({ session: "Logged In", userData: userNewData }),
      Logout: () => set({ session: "Logged Out", userData: null }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
