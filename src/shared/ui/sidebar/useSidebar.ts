import SidebarContext from '@/shared/ui/sidebar/SidebarContext';
import { useContext } from 'react';

export default function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebar 커스텀 훅은 SidebarProvider 자식에만 호출 할 수 있습니다.'
    );
  }
  return context;
}
