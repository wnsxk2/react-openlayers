import { useCallback, useEffect, useState } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  // 테마 토글 함수
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // DOM에 data-theme 속성 설정 (CSS에서 사용)
    document.documentElement.setAttribute('data-theme', newTheme);

    // localStorage에 저장 (새로고침 시 복원용)
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  // 앱 시작 시 저장된 테마 복원
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // 저장된 테마가 없으면 기본값(light) 적용
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  return {
    theme,
    toggleTheme,
  };
};
