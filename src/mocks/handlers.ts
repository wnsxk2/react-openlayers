import { mapHandlers } from '@/mocks/map';
import { userHandlers } from '@/mocks/user';

// Mock API 핸들러들을 정의합니다.
export const handlers = [...userHandlers, ...mapHandlers];
