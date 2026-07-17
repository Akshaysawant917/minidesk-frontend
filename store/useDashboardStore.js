import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDashboardStore = create(
  persist(
    (set) => ({
      theme: 'light',
      sidebarCollapsed: false,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useDashboardStore = create(
//   persist(
//     (set) => ({
//       theme: 'dark',
//       sidebarCollapsed: false,
//       dashboardBg: '',

//       toggleTheme: () =>
//         set((state) => ({
//           theme: state.theme === 'light' ? 'dark' : 'light',
//         })),


//       toggleSidebar: () =>
//         set((state) => ({
//           sidebarCollapsed: !state.sidebarCollapsed,
//         })),

//       setTheme: (theme) => set({ theme }),

//       setDashboardBg: (bg) => set({ dashboardBg: bg }),
//     }),
//     {
//       name: 'dashboard-storage', 
//     }
//   )
// );
