import { useNavigate } from 'react-router-dom';

const useMapToggleMenu = () => {
  const navigate = useNavigate();
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
      label: '로그인',
      onClick: () => {
        navigate('/login');
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
export default useMapToggleMenu;
