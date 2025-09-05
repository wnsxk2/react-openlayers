import { createContext, useContext } from 'react';
import type { Theme } from '../types';

// Context에 담을 데이터 타입 정의
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Context 생성 (빈 상자)
export const ThemeContext = createContext<ThemeContextProps | null>(null);

// Context 안전하게 사용하는 훅
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  // Provider 없이 사용 시 에러
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
};
