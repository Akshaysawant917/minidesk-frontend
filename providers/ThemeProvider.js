'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';

export function ThemeProvider({ children }) {
  const theme = useDashboardStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
