import {APP_STORAGE_KEY} from '@/constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface AppState {
  userName: string | null;
  onboardingCompleted: boolean;
  nameInputCompleted: boolean; // Added to track name input
  isHydrated: boolean; // Added to track hydration status
  setUserName: (name: string) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  setNameInputCompleted: (completed: boolean) => void; // Added action for name input
  _setHydrated: (hydrated: boolean) => void; // Internal action to set hydration status
}

export const useAppStore = create<AppState>()(
  persist(
    (set, _) => ({
      userName: null,
      onboardingCompleted: false,
      nameInputCompleted: false, // Initial state for name input
      isHydrated: false, // Initial hydration state
      setUserName: name => set({userName: name}),
      setOnboardingCompleted: completed =>
        set({onboardingCompleted: completed}),
      setNameInputCompleted: completed => set({nameInputCompleted: completed}), // Action implementation
      _setHydrated: hydrated => set({isHydrated: hydrated}),
    }),
    {
      name: APP_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        onboardingCompleted: state.onboardingCompleted,
        nameInputCompleted: state.nameInputCompleted,
        userName: state.userName, // Add userName to persisted state
        // Do not persist isHydrated, it's a runtime state
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          state._setHydrated(true);
        }
      },
    },
  ),
);
