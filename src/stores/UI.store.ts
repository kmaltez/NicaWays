import { create } from "zustand";

type Lenguages = {
  Logo: "spain.svg" | "usa.png";
  Name: "Español" | "English";
};

interface UiState {
  PillShowing: boolean;
  ShowPill: () => void;
  HidePill: () => void;
  Lenguage: Lenguages;
  ChangeLenguage: (lenguage: Lenguages) => void;
}

export const useUIStore = create<UiState>()((set) => ({
  PillShowing: true,
  ShowPill: () => set({ PillShowing: true }),
  HidePill: () => set({ PillShowing: false }),
  Lenguage: { Logo: "spain.svg", Name: "Español" },
  ChangeLenguage: (lenguage) => set({ Lenguage: lenguage }),
}));
