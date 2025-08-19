// src/shared/ui/sidebar/SidebarContext.jsx
import {
  createContext,
  useState,
  useMemo,
  type PropsWithChildren,
} from 'react';

interface SidebarProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

// 1. Context 생성
const SidebarContext = createContext<SidebarProps | null>(null);

// 2. Context Provider 컴포넌트 생성
export function SidebarProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // useMemo를 사용하여 value가 불필요하게 재생성되는 것을 방지(리렌더링 최적화)
  const value = useMemo(
    () => ({
      isOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default SidebarContext;
