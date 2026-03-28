import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PhaseId } from './bolao.types';

interface BolaoStore {
  picks: Record<string, string>;
  activePhase: PhaseId;

  setPick: (matchId: string, pick: string) => void;
  removePick: (matchId: string) => void;
  togglePick: (matchId: string, pick: string) => void;
  setActivePhase: (phase: PhaseId) => void;
  resetAll: () => void;
  getPickCount: () => number;
  getPhasePickCount: (phaseMatchIds: string[]) => number;
}

export const useBolaoStore = create<BolaoStore>()(
  persist(
    (set, get) => ({
      picks: {},
      activePhase: 'rod1',

      setPick: (matchId, pick) =>
        set((state) => ({
          picks: { ...state.picks, [matchId]: pick },
        })),

      removePick: (matchId) =>
        set((state) => {
          const { [matchId]: _, ...rest } = state.picks;
          return { picks: rest };
        }),

      togglePick: (matchId, pick) => {
        const current = get().picks[matchId];
        if (current === pick) {
          get().removePick(matchId);
        } else {
          get().setPick(matchId, pick);
        }
      },

      setActivePhase: (phase) => set({ activePhase: phase }),
      resetAll: () => set({ picks: {}, activePhase: 'rod1' }),
      getPickCount: () => Object.keys(get().picks).length,
      getPhasePickCount: (phaseMatchIds) =>
        phaseMatchIds.filter((id) => id in get().picks).length,
    }),
    {
      name: 'bolao-picks',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
