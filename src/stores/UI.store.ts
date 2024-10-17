import { create } from "zustand";

interface UiState {
  PillShowing: boolean;
  ShowPill: () => void;
  HidePill: () => void;
}

export const useUIStore = create<UiState>()((set) => ({
  PillShowing: true,
  ShowPill: () => set({ PillShowing: true }),
  HidePill: () => set({ PillShowing: false }),
}));
