import type { PropsWithChildren } from 'react';
import { useTheme } from '@/shared/lib/theme/model/hooks/useTheme';
import { ThemeContext } from '@/shared/lib/theme/model/hooks/useThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  // 실제 테마 로직을 useTheme에서 가져옴
  const themeData = useTheme();

  // Context Provider로 자식들에게 데이터 공급
  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
