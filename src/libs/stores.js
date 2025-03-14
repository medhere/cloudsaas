import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
    persist(
        (set, get) => ({
            userdata: {},
            set: (data) => set((state) => ({ userdata: { ...state.userdata, ...data } })),
            clear: () => set({ userdata: 0 }),
        }),{
            name: 'appstore',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: (state) => {
                console.log('hydration starts')
        
                return (state, error) => {
                  if (error) {
                    console.log('an error happened during hydration', error)
                  } else {
                    console.log('hydration finished')
                  }
                }
              },
        }
    )
)

