import { useAuthContext } from '@/entities/auth';
import { useNavigate } from 'react-router-dom';

export const useMapToggleMenu = () => {
  const nav = useNavigate();
  const { isLoggedIn, logout } = useAuthContext();
  // TODO: entities에 로직 구현
  //   const { user, login, logout } = useUser();
  //   const { theme, toggleTheme } = useTheme();
  //   const { language, setLanguage } = useI18n();

  //   const menuItems = [
  //     { label: user ? '로그아웃' : '로그인', onClick: user ? logout : login },
  //     {
  //       label: theme === 'dark' ? '라이트모드' : '다크모드',
  //       onClick: toggleTheme,
  //     },
  //     {
  //       label: language,
  //       onClick: setLanguage,
  //     },
  //   ];

  const menuItems = [
    {
      label: isLoggedIn ? '로그아웃' : '로그인',
      onClick: () => {
        if (isLoggedIn) {
          logout();
        } else {
          nav('/login');
        }
      },
    },
    {
      label: '다크모드',
      onClick: () => {
        console.log('themte 상태 업데이트');
      },
    },
    {
      label: '영어',
      onClick: () => {
        console.log('language 상태 업데이트');
      },
    },
  ];
  return { menuItems };
};
