import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userName: string;
  setUserName: (name: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: '',
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: 'user-storage',
    }
  )
);
